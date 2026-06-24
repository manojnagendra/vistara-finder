from http.server import BaseHTTPRequestHandler
import urllib.parse
import json
import re
import time
from datetime import datetime
import requests
from bs4 import BeautifulSoup
import concurrent.futures

DAYS_MAP = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

def match_days(target_day, days_str):
    if not days_str:
        return True
    days_str = days_str.strip()
    if days_str.lower() == "daily":
        return True
    
    parts = [p.strip() for p in days_str.split(',')]
    for part in parts:
        if '-' in part:
            try:
                start_day, end_day = part.split('-')
                start_idx = DAYS_MAP.index(start_day.strip())
                end_idx = DAYS_MAP.index(end_day.strip())
                target_idx = DAYS_MAP.index(target_day)
                if start_idx <= end_idx:
                    if start_idx <= target_idx <= end_idx:
                        return True
                else:
                    if target_idx >= start_idx or target_idx <= end_idx:
                        return True
            except ValueError:
                pass
        else:
            if part == target_day:
                return True
    return False

def check_validity(target_date_str, validity_str):
    if not validity_str:
        return True
    
    try:
        target_dt = datetime.strptime(target_date_str, "%Y-%m-%d").date()
    except ValueError:
        return True
    
    date_strs = re.findall(r'\b\d{4}-\d{2}-\d{2}\b', validity_str)
    dates = []
    for ds in date_strs:
        try:
            dates.append(datetime.strptime(ds, "%Y-%m-%d").date())
        except ValueError:
            pass
            
    if not dates:
        return True
    
    val_lower = validity_str.lower()
    
    if "valid until" in val_lower:
        return target_dt <= dates[0]
    elif "effective from" in val_lower:
        return target_dt >= dates[0]
    elif "effective" in val_lower and "through" in val_lower:
        if len(dates) >= 2:
            return dates[0] <= target_dt <= dates[1]
    elif "operates only on" in val_lower:
        return target_dt == dates[0]
        
    return True

def get_route_flights(from_code, to_code):
    from_code = from_code.upper().strip()
    to_code = to_code.upper().strip()
    
    url = f"https://info.flightmapper.net/route/Air_India_AI_{from_code}_{to_code}"
    headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
    }
    
    try:
        response = requests.get(url, headers=headers, timeout=10)
        if response.status_code != 200:
            return []
            
        if "Air_India_AI_" not in response.url and "/airline/AI" not in response.text:
            return []
            
        soup = BeautifulSoup(response.content, 'html.parser')
        flightlist_div = soup.find('div', class_='flightlist')
        if not flightlist_div:
            return []
            
        tds = flightlist_div.find_all('td')
        parsed_flights = []
        
        for td in tds:
            flight_link = td.find('a', href=lambda href: href and href.startswith('/flight/'))
            if not flight_link:
                continue
                
            text = td.get_text(separator='\n').strip()
            lines = [line.strip() for line in text.split('\n') if line.strip()]
            
            flight_no = flight_link.text.strip()
            times = re.findall(r'\b\d{2}:\d{2}\b', td.text)
            dep_time = times[0] if len(times) >= 1 else ""
            arr_time = times[1] if len(times) >= 2 else ""
            
            aircraft = ""
            validity = ""
            days = ""
            
            for line in lines:
                if "Non-stop" in line:
                    aircraft = line.replace("Non-stop", "").strip()
                    aircraft = re.sub(r'\s+\d+:\d+\s*$', '', aircraft)
                    aircraft = re.sub(r'\b\d+:\d+\b', '', aircraft).strip()
                elif "Valid" in line or "Effective" in line or "Operates" in line:
                    validity = line
                elif any(day in line for day in ["Daily", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]):
                    if ":" not in line:
                        days = line
            
            airports = [a.text for a in td.find_all('a', href=lambda href: href and href.startswith('/airport/'))]
            origin = airports[0] if len(airports) >= 1 else ""
            destination = airports[1] if len(airports) >= 2 else ""
            
            parsed_flights.append({
                "flight_no": flight_no,
                "days": days,
                "dep_time": dep_time,
                "arr_time": arr_time,
                "origin": origin,
                "destination": destination,
                "aircraft": aircraft,
                "validity": validity
            })
            
        return parsed_flights
        
    except Exception:
        return []

def filter_flights(flights, date_str):
    if not date_str:
        return flights
        
    try:
        dt = datetime.strptime(date_str, "%Y-%m-%d")
        day_of_week = dt.strftime("%a")
    except ValueError:
        return flights
        
    filtered = []
    for f in flights:
        if match_days(day_of_week, f.get("days")) and check_validity(date_str, f.get("validity")):
            filtered.append(f)
    return filtered

TAIL_CACHE = {}

def get_flightstats_tail_no(carrier, flight_number):
    flight_number = "".join(c for c in flight_number if c.isdigit())
    if not flight_number:
        return None
        
    url = f"https://www.flightstats.com/v2/flight-details/{carrier}/{flight_number}"
    headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
    }
    
    try:
        res = requests.get(url, headers=headers, timeout=5)
        if res.status_code != 200:
            return None
            
        soup = BeautifulSoup(res.content, 'html.parser')
        scripts = soup.find_all('script')
        
        for script in scripts:
            if script.text and "window.__data=" in script.text:
                match = re.search(r'window\.__data\s*=\s*(\{.*?\});', script.text)
                if match:
                    data = json.loads(match.group(1))
                    sft = data.get("SingleFlightTracker", {})
                    ext = sft.get("extendedData", {})
                    add_info = ext.get("additionalFlightInfo", {})
                    equip = add_info.get("equipment", {})
                    tail = equip.get("tailNumber")
                    if tail:
                        return tail.strip().upper()
        return None
    except Exception:
        return None

def get_cached_tail_no(carrier, flight_number):
    now = time.time()
    if (carrier, flight_number) in TAIL_CACHE:
        tail, ts = TAIL_CACHE[(carrier, flight_number)]
        if now - ts < 10800:
            return tail
            
    tail = get_flightstats_tail_no(carrier, flight_number)
    TAIL_CACHE[(carrier, flight_number)] = (tail, now)
    return tail

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        parsed_url = urllib.parse.urlparse(self.path)
        query_params = urllib.parse.parse_qs(parsed_url.query)
        from_code = query_params.get('from', [''])[0].strip().upper()
        to_code = query_params.get('to', [''])[0].strip().upper()
        date_str = query_params.get('date', [''])[0].strip()
        
        if not from_code or not to_code:
            self.send_response(400)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({"error": "Origin and Destination codes are required"}).encode('utf-8'))
            return
            
        flights = get_route_flights(from_code, to_code)
        filtered = filter_flights(flights, date_str)
        
        if filtered:
            with concurrent.futures.ThreadPoolExecutor(max_workers=min(len(filtered), 15)) as executor:
                futures = {
                    executor.submit(get_cached_tail_no, "AI", f["flight_no"].replace("AI", "").strip()): f
                    for f in filtered
                }
                for future in concurrent.futures.as_completed(futures):
                    f = futures[future]
                    try:
                        f["tail_no"] = future.result()
                    except Exception:
                        f["tail_no"] = None
                        
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(json.dumps(filtered).encode('utf-8'))
        return

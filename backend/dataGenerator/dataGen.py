import random
from datetime import datetime, timedelta
import dateutil.relativedelta
import json

# Helper Functions
def parse_time(time_str):
    """Parse a time string into a datetime object."""
    time_str = time_str.replace(" ", "").lower()
    if time_str.endswith(("am", "pm")):
        return datetime.strptime(time_str, "%I:%M%p")
    return datetime.strptime(time_str, "%H:%M")

def generate_random_datetime(start_date, end_date, start_time, end_time):
    """Generate a random datetime between a start and end date with 15-minute increments."""
    random_date = start_date + timedelta(days=random.randint(0, (end_date - start_date).days))
    start_time_obj = parse_time(start_time)
    end_time_obj = parse_time(end_time)
    random_hour = random.randint(start_time_obj.hour, min(end_time_obj.hour, 23))
    random_minute = random.choice([0, 15, 30, 45])
    return datetime(random_date.year, random_date.month, random_date.day, random_hour, random_minute)

# Data Generation Function
def generate_data(month, year, initial_id, customer_names, services, worker_names, preferences, time_range, num_bookings):
    """Generate booking data for a given month and year."""
    data = []
    start_date = datetime(year, month, 1)
    end_date = start_date + dateutil.relativedelta.relativedelta(months=1) - timedelta(days=1)
    start_time, end_time = time_range

    for i in range(initial_id, initial_id + num_bookings):  # Generate specified number of bookings
        start_time_obj = generate_random_datetime(start_date, end_date, start_time, end_time)
        duration = random.randint(2, 8) * 15
        end_time_obj = start_time_obj + timedelta(minutes=duration)

        data.append({
            "id": i,
            "booking_name": random.choice(worker_names),  # Renamed to avoid SQL keyword conflict
            "timeRange": f"{start_time_obj.strftime('%I:%M %p')} - {end_time_obj.strftime('%I:%M %p')}",
            "startTime": start_time_obj.strftime('%Y-%m-%dT%H:%M:%S'),
            "endTime": end_time_obj.strftime('%Y-%m-%dT%H:%M:%S'),
            "workerID": random.randint(100, 200),
            "workerName": random.choice(worker_names),
            "customerID": random.randint(200, 300),
            "customerName": random.choice(customer_names),
            "booking_service": random.choice(services),  # Renamed to avoid SQL keyword conflict
            "price": random.randint(20, 100),
            "notes": random.choice(preferences)
        })

    return data

# SQL Generation Function
def generate_sql_insert_statements(data):
    """Generate SQL INSERT statements from the booking data."""
    sql_values = []
    for item in data:
        values = (
            f"{item['id']}, "
            f"'{item['booking_name']}', "
            f"'{item['timeRange']}', "
            f"'{item['startTime']}', "
            f"'{item['endTime']}', "
            f"{item['workerID']}, "
            f"'{item['workerName']}', "
            f"{item['customerID']}, "
            f"'{item['customerName']}', "
            f"'{item['booking_service']}', "
            f"{item['price']}, "
            f"'{item['notes'].replace("'", "''")}'"  # Escape single quotes in notes
        )
        sql_values.append(f"({values})")

    sql = f"""
INSERT INTO bookings (
    bookings_id, booking_name, time_range, start_time, end_time,
    worker_id, worker_name, customer_id, customer_name,
    booking_service, price, notes
)
VALUES
    {",\n    ".join(sql_values)};
"""
    return sql

# Main Function
def main():
    """
    Main function to generate booking data and SQL INSERT statements.
    Modify the parameters below to customize the output.
    """
    # Example Data (Modify these as needed)
    customer_names = ["John Smith", "Alice Johnson", "Bob Williams", "Sarah Davis", "Emily Wilson"]
    services = ["hair coloring", "haircut", "hair wash", "deep conditioning"]
    worker_names = ["Barber A", "Barber B", "Barber C", "Barber D", "Barber E"]
    preferences = ["wants a messy look", "prefers a quiet session", "needs extra time"]
    time_range = ["6:00", "19:00"]  # Time range for bookings
    months = [(1, 2025), (2, 2025)]  # List of (month, year) tuples to generate data for
    
    # Prompt for the number of bookings
    num_bookings = int(input("Enter the number of bookings to generate: "))  # User-defined number of bookings
    initial_id = 3001  # Starting ID for bookings

    # Generate Data
    data = []
    for month, year in months:
        data.extend(generate_data(month, year, initial_id, customer_names, services, worker_names, preferences, time_range, num_bookings))
        initial_id += num_bookings  # Increment initial ID for the next month

    # Generate SQL
    sql_insert_statements = generate_sql_insert_statements(data)

    # Write SQL to a file
    with open("bookings.sql", "w") as sql_file:
        sql_file.write(sql_insert_statements)

    print(f"SQL file 'bookings.sql' has been generated with {len(data)} bookings.")

# Run the Program
if __name__ == "__main__":
    main()

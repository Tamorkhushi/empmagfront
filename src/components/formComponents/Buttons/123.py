# First, you need to install the phonenumbers library.
# You can do this by running the following command in your terminal or command prompt:
# pip install phonenumbers

import phonenumbers
from phonenumbers import geocoder, carrier, timezone

def get_phone_number_info(phone_number_str):
    """
    This function takes a phone number as a string (including the country code)
    and prints information about it.
    """
    try:
        # Parse the phone number string.
        # The second argument is the default region, but it's best to include
        # the country code in the number string itself for accuracy.
        parsed_number = phonenumbers.parse(phone_number_str, None)

        # Check if the number is valid.
        if not phonenumbers.is_valid_number(parsed_number):
            return "Invalid phone number provided. Please include the country code (e.g., +1 for USA, +91 for India)."

        # Get the geographical location (country/city).
        location = geocoder.description_for_number(parsed_number, "en")

        # Get the service provider (carrier).
        service_provider = carrier.name_for_number(parsed_number, "en")

        # Get the time zone(s) associated with the number.
        time_zones = timezone.time_zones_for_number(parsed_number)

        # Format the output
        info = f"--- Phone Number Information ---\n"
        info += f"Phone Number: {phone_number_str}\n"
        info += f"Location: {location}\n"
        
        # The carrier information might not be available for all numbers, especially landlines.
        if service_provider:
            info += f"Service Provider: {service_provider}\n"
        else:
            info += "Service Provider: Not available\n"

        if time_zones:
            info += f"Time Zone(s): {', '.join(time_zones)}\n"
        else:
            info += "Time Zone(s): Not available\n"
        
        info += "--------------------------------"
        
        return info

    except phonenumbers.phonenumberutil.NumberParseException as e:
        return f"Error parsing the phone number: {e}. Please make sure to include the country code."
    except Exception as e:
        return f"An unexpected error occurred: {e}"

# --- Example Usage ---
# Replace this with the phone number you want to look up.
# IMPORTANT: Always include the country code with a '+' sign.
# For example: +1 for USA, +44 for UK, +91 for India.
phone_to_check = "+918800932524" # Example: A Google number in the US

# Get and print the information
information = get_phone_number_info(phone_to_check)
print(information)

# Another example for a number in India
phone_to_check_india = "+917678295963"
information_india = get_phone_number_info(phone_to_check_india)
print("\n" + information_india)

# Example of an invalid number
invalid_phone = "12345"
information_invalid = get_phone_number_info(invalid_phone)
print("\n" + information_invalid)

def decode_string(input_str):
    result = ""
    i = 0
    length = len(input_str)
    
    while i < length:
        # Find sequence of letters
        seq_start = i
        while i < length and input_str[i].isalpha():
            i += 1
        
        sequence = input_str[seq_start:i]
        
        # Find sequence of digits
        num_start = i
        while i < length and input_str[i].isdigit():
            i += 1
        
        if num_start < i:
            repeat_count = int(input_str[num_start:i])
            result += sequence * repeat_count
    
    return result

# Example usage
input_str = "aa30bad5"
output = decode_string(input_str)
print(output)

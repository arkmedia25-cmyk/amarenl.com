from PIL import Image, ImageDraw, ImageFont

def create_slide(filename, background_color, text, text_color, call_to_action=None, call_to_action_color=None, duration=None):
    width, height = 1080, 1920
    img = Image.new('RGB', (width, height), color = background_color)
    d = ImageDraw.Draw(img)

    try:
        font_path = "/System/Library/Fonts/Supplemental/Arial Bold.ttf" # Common font on macOS
        title_font = ImageFont.truetype(font_path, 90)
        body_font = ImageFont.truetype(font_path, 70)
        cta_font = ImageFont.truetype(font_path, 80)
    except IOError:
        # Fallback to a default font if Arial Bold is not found
        title_font = ImageFont.load_default()
        body_font = ImageFont.load_default()
        cta_font = ImageFont.load_default()
        print("Warning: Arial Bold font not found. Using default font.")


    # Text wrapping for main text
    def draw_text_wrapped(draw, text_content, font, text_color, x, y, max_width):
        words = text_content.split()
        lines = []
        current_line = []
        
        for word in words:
            test_line = ' '.join(current_line + [word])
            bbox = draw.textbbox((0, 0), test_line, font=font)
            text_width = bbox[2] - bbox[0]
            if text_width <= max_width:
                current_line.append(word)
            else:
                lines.append(' '.join(current_line))
                current_line = [word]
        lines.append(' '.join(current_line))
        
        for line in lines:
            bbox = draw.textbbox((0, 0), line, font=font)
            text_width = bbox[2] - bbox[0]
            d.text(((width - text_width) / 2, y), line, font=font, fill=text_color)
            y += font.getbbox(line)[3] - font.getbbox(line)[1] + 30 # Line spacing

    # Hook Slide
    if duration == 3: # This is the hook slide
        bbox = d.textbbox((0,0), text, font=title_font)
        text_width, text_height = bbox[2] - bbox[0], bbox[3] - bbox[1]
        x = (width - text_width) / 2
        y = (height - text_height) / 2
        d.text((x, y), text, font=title_font, fill=text_color)
    else: # Main slide
        # Main text
        draw_text_wrapped(d, text, body_font, text_color, 0, height // 3, width * 0.9) # Start higher up, wider allowed width

        # Call to action
        if call_to_action and call_to_action_color:
            bbox = d.textbbox((0,0), call_to_action, font=cta_font)
            cta_width, cta_height = bbox[2] - bbox[0], bbox[3] - bbox[1]
            cta_x = (width - cta_width) / 2
            cta_y = height - cta_height - 100 # Position near bottom
            d.text((cta_x, cta_y), call_to_action, font=cta_font, fill=call_to_action_color)


    img.save(filename)

# Define colors
YELLOW = (255, 255, 0)
BLACK = (0, 0, 0)
WHITE = (255, 255, 255)
LIGHT_BLUE = (173, 216, 230) # A calming light blue
GOLD = (255, 215, 0)

# Create hook slide
create_slide("hook_slide.png", BLACK, "Voel je je vaak moe of gestrest?", YELLOW, duration=3)

# Create main slide
create_slide("main_slide.png", LIGHT_BLUE, "Magnesium kan helpen bij energie, spierfunctie en ontspanning. Een essentieel mineraal voor jouw welzijn.", WHITE, "Kijk in de bio →", GOLD, duration=10)

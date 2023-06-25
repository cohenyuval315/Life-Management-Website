from integration.telegram.run import bot
import requests

# Handle '/start' and '/help'
@bot.message_handler(commands=['help', 'start'])
async def send_welcome(message):
    await bot.reply_to(message, """\
Hi there, I am EchoBot.
I am here to echo your kind words back to you. Just say anything nice and I'll say the exact same thing to you!\
""")

# Handle all other messages with content_type 'text' (content_types defaults to ['text'])
# @bot.message_handler(func=lambda message: True)
# async def echo_message(message):
#     await bot.reply_to(message, message.text)


@bot.message_handler(commands=['coms'])
async def echo_message(message):
    msg = ""
    await bot.send_message(message.chat.id,msg)


@bot.message_handler(commands=['login'])
async def echo_message(message):
    msg_arr= message.text.split()

@bot.message_handler(commands=['n'])
async def echo_message(message):
    msg_arr = message.text.split(' ')
    stack = []
    print(msg_arr)
    if len(msg_arr) < 3:
        return bot.send_message(message.chat.id,"failed")
    name = msg_arr[1]
    description = ""
    
    i = 0
    for msg in msg_arr:
        stack.append(msg)
        if i < 2:
            i = i + 1
            continue
        description += msg + " "
        
    await bot.send_message(message.chat.id,"success")


@bot.message_handler(commands=['notes'])
async def echo_message(message):
    msg_arr = message.text.split()
    print(msg_arr)
    if len(msg_arr) < 3:
        return bot.send_message(message.chat.id,"failed")
    name = msg_arr[1]
    description = ""
    
    i = 0
    for msg in msg_arr:
        if i < 2:
            i = i + 1
            continue
        description += msg + " "
        
    await bot.send_message(message.chat.id,"success")



    
@bot.message_handler(commands=['e'])
async def echo_message(message):

    await bot.send_message(message.chat.id,"what did u do")
    await bot.send_message(message.chat.id)

class CommandsParser:
    def __init__(self, message) -> None:
        self.message = message
    

def send_msg(text):
   url_req = "https://api.telegram.org/bot" + TOKEN + "/sendMessage" + "?chat_id=" + CHAT_ID + "&text=" + text 
   results = requests.get(url_req)
   print(results.json())
   

def sample_response(input_text):
    user_message = str(input_text).lower()
    
    if user_message in ("hello","hi","sup"):
        return "hi back"
   
   
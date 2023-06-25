from config import configuration
from telebot.async_telebot import AsyncTeleBot
import time,os,sys,asyncio,requests

TOKEN = configuration.TELEGRAM_API_TOKEN
CHAT_ID = configuration.TELEGRAM_CHAT_ID

bot = AsyncTeleBot(TOKEN)

def telegram_offline_run():
    while True:
        try:
            asyncio.run(bot.infinity_polling(timeout=10))
        except (ConnectionError,requests.ReadTimeout) as e:
            print(e)
            time.sleep(5)
            sys.stdout.flush()
            os.execv(sys.argv[0],sys.argv)

        else:
            asyncio.run(bot.infinity_polling(timeout=10))


def telegram_online_run():
    pass

def telegram_run():
    if configuration.TELEGRAM_ONLINE == None:
        return None
    else:
        if configuration.TELEGRAM_ONLINE == True:
            # telegram webhook
            return telegram_online_run 
        else:
            # infinity loop
            return telegram_offline_run


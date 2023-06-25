from app import create_app
from config import configuration
# from socket import gethostname
# from integration import telegram_run

# from exts import db``

# def context():
#     with app.app_context():
#         db.drop_all()
#         db.create_all()
# context()



app=create_app(configuration)

WEBHOOK_PORT = 8443
WEBHOOK_LISTEN = '0.0.0.0' 
WEBHOOK_SSL_CERT = './cert/webhook_cert.pem'  
WEBHOOK_SSL_PRIV = './cert/webhook_pkey.pem'  


if __name__ == '__main__':
    # if telegram_run:
    #     telegram_run()
        
    # if 'liveconsole' not in gethostname():
    app.run(
        # host=WEBHOOK_LISTEN,
        #     port=WEBHOOK_PORT,
        #     ssl_context=(WEBHOOK_SSL_CERT, WEBHOOK_SSL_PRIV),
            debug=True)


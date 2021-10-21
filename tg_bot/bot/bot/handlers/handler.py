import logging
import requests
from tg_bot.bot.bot.loader import dp
from aiogram.types import Message
import json
from tg_bot.bot.bot.nalog_python import NalogRuPython
from tg_bot.bot.bot.fnl_requests import json_parser


@dp.message_handler(content_types=['document', 'photo'])
async def handle_docs_photo(message: Message):
    logging.info('зашёл в метод')
    if message.document is None:
        await message.photo[-1].download('чек1.jpg')
        filename = 'чек1.jpg'
    else:
        await message.document.download('чек2.jpg')
        filename = 'чек2.jpg'
    data = parse_data(get_info_zxing_qrscanner(filename))
    client = NalogRuPython()
    qr_code = get_info_zxing_qrscanner(filename).replace("amp;", '')
    ticket = client.get_ticket(qr_code)
    print(json.dumps(ticket, indent=4, ensure_ascii=False))
    print(ticket)
    # f"{time_res} Вы купили: {items}, потратив всего: {total_sum}"
    data_checka = json_parser(ticket)
    result_answer = ""
    for el in data_checka[1]:
        result_answer = result_answer + '\n' + el
    await message.answer(f"{data_checka[0]} Вы купили: {result_answer}  \n \n Потратив всего: {data_checka[2]} \u20bd")
    #  await message.answer(json_parser(json.dumps(ticket, indent=4, ensure_ascii=False)))
    value = data[0][6:]
    month = data[0][4:6]
    year = data[0][:4]

    # await message.answer(f'{value}.{month}.{year} вы совершили покупку на {data[1]} рублей')
    # logging.info('fff')


@dp.message_handler()
async def exo(message: Message):
    await message.answer(f'Ты написал {message.text}.\n Я жду команду /start')
    await message.photo[0].download()


def parse_data(data):
    date = data[2:10]
    sum = data[22:25]
    fn = data[37:52]
    fp = data[71:80]
    return date, sum, fn, fp


def qrcode_scanner(url, filename):
    """
        отправляет запрос в онлайн сканер qr кодов и получает ответ от сервера (Отправка файла через Request Payload)
        url - ссылка на скрипт онлайн сканера
        filename  - путь до файла снимка где находится фотография с qr кодом
    """
    with open(filename, 'rb') as f:
        r = requests.post(url, files={filename: f})
        result = {"code": r.status_code, "text": r.text}
    return result


def get_info_zxing_qrscanner(filename):
    url = "https://zxing.org/w/decode"
    rr = qrcode_scanner(url, filename)

    s = rr["text"]
    i = s.find("pre")
    s = s[i + 4:]
    i = s.find("pre")
    s = s[:i]
    s = s.strip("/")
    s = s.strip("<")
    s = s.strip(">")
    return s




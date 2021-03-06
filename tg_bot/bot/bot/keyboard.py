"""Создание кнопок"""
from aiogram.types import InlineKeyboardButton, InlineKeyboardMarkup

choice_bt = InlineKeyboardMarkup(row_width=1)
b_t = InlineKeyboardButton(text="Выбрать командировку для добавления чека",
                           callback_data='choice_bt')
get_id = InlineKeyboardButton(text='Получить id', callback_data='get_id')
choice_bt.insert(b_t)
choice_bt.insert(get_id)


yes_no = InlineKeyboardMarkup(row_width=2)
yes = InlineKeyboardButton(text="Да", callback_data='yes')
no = InlineKeyboardButton(text="Нет, добавить чек к законеченной командировке",
                          callback_data='no')
yes_no.insert(yes)
yes_no.insert(no)


close_bt = InlineKeyboardMarkup(row_width=2)
last_b_t = InlineKeyboardButton(text='Добавить чек к законеченной командировке',
                                callback_data='no')
close = InlineKeyboardButton(text='Закрыть', callback_data='close')
close_bt.insert(last_b_t)
close_bt.insert(close)

yes_close = InlineKeyboardMarkup(row_width=2)
yes_close.insert(yes)
yes_close.insert(close)


change_phone = InlineKeyboardMarkup(row_width=2)
phone = InlineKeyboardButton(text='Изменить номер телефона',
                             callback_data='change_phone')
change_phone.insert(phone)
change_phone.insert(close)


close_all = InlineKeyboardMarkup(row_width=1)
close_all.insert(close)

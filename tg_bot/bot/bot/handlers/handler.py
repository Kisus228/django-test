from tg_bot.bot.bot.loader import dp, bot
from aiogram.types import Message, CallbackQuery
from aiogram.dispatcher import FSMContext
from aiogram.dispatcher.filters import Text
import logging


@dp.message_handler()
async def exo(message: Message):
    await message.answer(f'�� ������� {message.text}.\n � ��� ������� /start')

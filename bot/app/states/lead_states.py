from aiogram.fsm.state import State, StatesGroup


class LeadStates(StatesGroup):
    name = State()
    goal = State()
    level = State()
    format_time = State()
    contact = State()
    comment = State()


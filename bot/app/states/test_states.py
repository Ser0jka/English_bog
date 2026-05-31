from aiogram.fsm.state import State, StatesGroup


class TestStates(StatesGroup):
    name = State()
    age_target = State()
    goal = State()
    level = State()
    pain = State()
    format = State()
    contact = State()


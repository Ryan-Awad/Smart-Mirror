"""
Mobile Android app for working with the Smart Mirror's calendar.
"""
import toga
from toga.style import Pack
from toga.style.pack import COLUMN, ROW


class SmartMirrorCalendar(toga.App):

    def startup(self):
        """
        Construct and show the Toga application.

        Usually, you would add your application to a main content box.
        We then create a main window (with a name matching the app), and
        show the main window.
        """
        main_box = toga.Box()

        title_label = toga.Label('Smart Mirror Calendar')
        main_box.add(title_label)

        self.main_window = toga.MainWindow(title=self.formal_name)
        self.main_window.content = main_box
        self.main_window.show()


def main():
    return SmartMirrorCalendar()

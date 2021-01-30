import os
import time
import unittest
from datetime import datetime,timedelta
from threading import Thread

# from nose.tools import assert_is_not_none, assert_true
# from nose.tools import nottest
from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait

driver = None 
message_input = None 
actions = None
def getDayValue(day):
    if day == 'Monday':
        return 1  
    elif day == 'Tuesday':
        return 2
    if day == 'Wednesday':
        return 3
    elif day == 'Thursday':
        return 4
    if day == 'Friday':
        return 5
    elif day == 'Saturday':
        return 6
    else:
        return 7

class TestActions(unittest.TestCase):
    def test_search_in_pytho_ord(self):
        print("")

    @classmethod
    def setUpClass(cls):
        global driver, message_input, actions
        # set_env()
        driver = webdriver.Chrome()
        driver.get("https://app.slack.com/client/TPJMSBWR4/CPGFMAGGY")
        wait = WebDriverWait(driver, 10)

        wait.until(EC.presence_of_element_located((By.ID, "submit_team_domain")))

        channel = driver.find_element_by_id("domain")
        channel.send_keys("botupystestteam")
        channel.submit()
        wait.until(EC.presence_of_element_located((By.ID, "email")))
        id = driver.find_element_by_id("email")
        password = driver.find_element_by_id("password")
        id.send_keys(os.environ['selenium_id'])        
        password.send_keys(os.environ['selenium_password'])
        sign_in = driver.find_element_by_id("signin_btn")
        sign_in.click()
        
        scrumbot = wait.until(lambda driver: driver.find_element_by_xpath(".//span[contains(text(), 'scrumbot')]"))
        scrumbot.click()

        p = wait.until(EC.presence_of_element_located((By.CLASS_NAME, "ql-editor")))
        input = p.find_element_by_xpath(".//p")
        now = datetime.now()
        day = getDayValue(datetime.now().strftime("%A"))
        time = (str(now + timedelta(minutes = 2)).split(" ")[1].split(":"))
        input.send_keys("/setweeklyreporttime " + str(day) + " " + time[0] + ":" + time[1])
        input.send_keys(u'\ue007')
        
        channel = wait.until(lambda driver: driver.find_element_by_xpath(".//span[contains(text(), 'projectbuys')]"))
        channel.click()


        # d = datetime.strptime(time[0] + ":" + time[1], "%H:%M")
        # d.strftime("%I:%M %p")
        # timevalue_12hour = time.strftime( "%I:%M %p", t )

        # print("TIIIIIIIIIIIIIIIIIIIMEEEE = ", time[0] + ":" + time[1])
        # print(str(d))
        # output_time = ".//span[contains(text(), " + str(d) + ")]"
        wait = WebDriverWait(driver, 100)
        # print("XXXXXXXXXXXXXX ", output_time)
        # t = wait.until(lambda driver: driver.find_element_by_xpath(output_time))
        # parent = t.find_element_by_xpath('..').find_element_by_xpath('..').find_element_by_xpath('..')
        lastField = []
        all_spans = driver.find_elements_by_xpath("//span[@class='c-message__body']")
        # lastField = driver.find_element_by_class_name("c-message__body")

        # output = parent.find_element_by_class_name("c-message__body")
        print("XXXXXXXXXXXXXXX ", type(all_spans[len(all_spans)-1].text))
        
        assert type(all_spans[len(all_spans)-1].text) == str
        driver.quit()


if __name__ == "__main__":
    unittest.main()

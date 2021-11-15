import scrapy
from ..constants import (
    NFL_TEAMS_URL,
    NFL_TEAMS_CSS_SELECTOR, 
    NFL_SCHEDULE_CSS_SELECTOR
)
from ..items import NFLTeamItem


class NflTeamsSpider(scrapy.Spider):
    """
    Scraper to get nfl teams and schedule
    Cmd: scrapy crawl NFL_Teams
         scrapy crawl NFL_Teams -a year=?
    """

    name = "NFL_Teams"
    allowed_domains = ["espn.com"]

    custom_settings = {"ITEM_PIPELINES": {"data.pipelines.NflTeamPipeline": 400}}

    def __init__(self, year: str = "2021", *args, **kwargs):
        super(NflTeamsSpider, self).__init__(*args, **kwargs)
        self.year = year

    def start_requests(self):
        URL = NFL_TEAMS_URL + self.year
        yield scrapy.Request(url=URL, callback=self.parse)

    def parse(self, response):
        teams = response.css(NFL_TEAMS_CSS_SELECTOR).extract()
        schedule = response.css(NFL_SCHEDULE_CSS_SELECTOR).extract()
        result = []
        for item in schedule[20:]:
            if item.find("align=") != -1:
                continue
            if item.find("BYE") != -1:
                element = item.split('">')[1].split("</")[0]
            elif item.find("<td><a") != -1:
                element = item.split('">')[1].split("</")[0]
            else:
                element = item.split("<td>")[1].split("</td")[0]
            result.append(element)
        item = NFLTeamItem()
        item["teams"] = teams
        item["matchups"] = result
        item["year"] = self.year
        yield item        
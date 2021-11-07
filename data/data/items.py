import scrapy


class NFLTeamItem(scrapy.Item):
    teams = scrapy.Field()
    matchups = scrapy.Field()
    year = scrapy.Field()
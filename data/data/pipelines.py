from itemadapter import ItemAdapter
import json

class NflTeamPipeline:
    def process_item(self, item, spider):
        data = {}
        year = item["year"]
        teams = item["teams"]
        matchups = item["matchups"]
        index = 0
        for team in teams:
            data[f"{team}"] = []
            for matchup_idx in range(index, index+18):
                week = matchup_idx - index + 1
                matchup = matchups[matchup_idx]
                home = True if matchup[0] != '@' else False
                data[f"{team}"].append(
                    {
                        f"Week {week}": week,
                        "Opponent": matchup.replace("@",""),
                        "Home": home
                    }
                )
            index += 18
        with open(f"NFL_Season_{year}.json", "w") as f:
            json.dump(data, f)
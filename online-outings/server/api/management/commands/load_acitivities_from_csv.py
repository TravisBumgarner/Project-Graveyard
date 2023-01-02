import csv
import uuid
import datetime
from django.core.management.base import BaseCommand

from api.models import Activity, Link, Category


class Command(BaseCommand):
    def handle(self, *args, **options):
        filename = "inputs.csv"

        Activity.objects.all().delete()
        Category.objects.all().delete()
        Link.objects.all().delete()

        with open("inputs.csv", newline="") as csvfile:
            csvreader = csv.DictReader(csvfile)
            for row in csvreader:
                if row["is_published"].lower() == "false":
                    continue
                print(row["name"])
                activity = Activity(
                    name=row["name"],
                    description=row["description"],
                    date_created=datetime.datetime.strptime(
                        row["date_created"], "%m/%d/%Y"
                    ).date(),
                    min_cost=row["min_cost"],
                    max_cost=row["max_cost"],
                    min_participants=row["min_participants"],
                    max_participants=row["max_participants"],
                    requirements=row["requirements"],
                )
                activity.save()

                links = [link for link in row["links"].split("\n")]
                for link in links:
                    if len(link):
                        name, url = link.split(",")
                    link = Link(name=name.strip(), url=url.strip(), activity=activity)
                    link.save()

                categories_names = [
                    category.strip().lower()
                    for category in row["categories"].split(",")
                    if len(category)
                ]
                for category_name in categories_names:
                    try:
                        category = Category.objects.get(name=category_name)
                    except Category.DoesNotExist:
                        category = Category.objects.create(name=category_name)

                    category.save()
                    activity.categories.add(category)

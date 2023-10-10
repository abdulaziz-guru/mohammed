from setuptools import setup, find_packages

with open("requirements.txt") as f:
	install_requires = f.read().strip().split("\n")

# get version from __version__ variable in tech_challenge_app/__init__.py
from tech_challenge_app import __version__ as version

setup(
	name="tech_challenge_app",
	version=version,
	description="Tech Challenge Application",
	author="mohamed.salamaa41@gmail.com",
	author_email="mohamed.salamaa41@gmail.com",
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)

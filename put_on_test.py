#!/usr/bin/env python3

import os
import shutil

import build
import publish

qin_root = os.environ['QIN_ROOT']
build()
publish("development")
shutil.copytree(
    "./public", f"{qin_root}/Test/app/qin_case", dirs_exist_ok=True)

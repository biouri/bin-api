Установка конкретрой версии Python 3.11.9

```shell
choco install python --version=3.11.9 --force
```

Просмотр всех версий Python

```shell
choco list python
```

Установка HTTPie:
https://httpie.io/cli

HTTPie CLI can be installed on any OS.

```shell
choco install httpie
```

Важно! Будет установлена последняя версия Python, и возможно потребуется вернуть предыдущую версию, например при помощи команд выше.
Output log после установки `choco install httpie`

```text
Chocolatey v2.0.0
Installing the following packages:
httpie
By installing, you accept licenses for the packages.
Progress: Downloading chocolatey-compatibility.extension 1.0.0... 100%

chocolatey-compatibility.extension v1.0.0 [Approved]
chocolatey-compatibility.extension package files install completed. Performing other installation steps.
 Installed/updated chocolatey-compatibility extensions.
 The install of chocolatey-compatibility.extension was successful.
  Software installed to 'C:\ProgramData\chocolatey\extensions\chocolatey-compatibility'
Progress: Downloading chocolatey-core.extension 1.4.0... 100%

chocolatey-core.extension v1.4.0 [Approved]
chocolatey-core.extension package files install completed. Performing other installation steps.
 Installed/updated chocolatey-core extensions.
 The install of chocolatey-core.extension was successful.
  Software installed to 'C:\ProgramData\chocolatey\extensions\chocolatey-core'
Progress: Downloading chocolatey-windowsupdate.extension 1.0.5... 100%

chocolatey-windowsupdate.extension v1.0.5 [Approved]
chocolatey-windowsupdate.extension package files install completed. Performing other installation steps.
 Installed/updated chocolatey-windowsupdate extensions.
 The install of chocolatey-windowsupdate.extension was successful.
  Software installed to 'C:\ProgramData\chocolatey\extensions\chocolatey-windowsupdate'
Progress: Downloading KB2919442 1.0.20160915... 100%

KB2919442 v1.0.20160915 [Approved]
KB2919442 package files install completed. Performing other installation steps.
The package KB2919442 wants to run 'ChocolateyInstall.ps1'.
Note: If you don't run this script, the installation will fail.
Note: To confirm automatically next time, use '-y' or consider:
choco feature enable -n allowGlobalConfirmation
Do you want to run the script?([Y]es/[A]ll - yes to all/[N]o/[P]rint): Y

Skipping installation because this hotfix only applies to Windows 8.1 and Windows Server 2012 R2.
 The install of KB2919442 was successful.
  Software install location not explicitly set, it could be in package or
  default install location of installer.
Progress: Downloading KB2919355 1.0.20160915... 100%

KB2919355 v1.0.20160915 [Approved]
KB2919355 package files install completed. Performing other installation steps.
The package KB2919355 wants to run 'ChocolateyInstall.ps1'.
Note: If you don't run this script, the installation will fail.
Note: To confirm automatically next time, use '-y' or consider:
choco feature enable -n allowGlobalConfirmation
Do you want to run the script?([Y]es/[A]ll - yes to all/[N]o/[P]rint): Y

Skipping installation because this hotfix only applies to Windows 8.1 and Windows Server 2012 R2.
 The install of KB2919355 was successful.
  Software install location not explicitly set, it could be in package or
  default install location of installer.
Progress: Downloading KB2999226 1.0.20181019... 100%

KB2999226 v1.0.20181019 [Approved]
KB2999226 package files install completed. Performing other installation steps.
The package KB2999226 wants to run 'chocolateyinstall.ps1'.
Note: If you don't run this script, the installation will fail.
Note: To confirm automatically next time, use '-y' or consider:
choco feature enable -n allowGlobalConfirmation
Do you want to run the script?([Y]es/[A]ll - yes to all/[N]o/[P]rint): Y

Skipping installation because update KB2999226 does not apply to this operating system (Майкрософт Windows 10 Pro).
 The install of KB2999226 was successful.
  Software install location not explicitly set, it could be in package or
  default install location of installer.
Progress: Downloading KB3035131 1.0.3... 100%

KB3035131 v1.0.3 [Approved]
KB3035131 package files install completed. Performing other installation steps.
The package KB3035131 wants to run 'ChocolateyInstall.ps1'.
Note: If you don't run this script, the installation will fail.
Note: To confirm automatically next time, use '-y' or consider:
choco feature enable -n allowGlobalConfirmation
Do you want to run the script?([Y]es/[A]ll - yes to all/[N]o/[P]rint): A

Skipping installation because update KB3035131 does not apply to this operating system (Майкрософт Windows 10 Pro).
 The install of KB3035131 was successful.
  Software install location not explicitly set, it could be in package or
  default install location of installer.
Progress: Downloading KB3033929 1.0.5... 100%

KB3033929 v1.0.5 [Approved]
KB3033929 package files install completed. Performing other installation steps.
Skipping installation because update KB3033929 does not apply to this operating system (Майкрософт Windows 10 Pro).
 The install of KB3033929 was successful.
  Software install location not explicitly set, it could be in package or
  default install location of installer.
Progress: Downloading vcredist140 14.42.34438.20250221... 100%

vcredist140 v14.42.34438.20250221 [Approved]
vcredist140 package files install completed. Performing other installation steps.
Downloading vcredist140-x86
  from 'https://download.visualstudio.microsoft.com/download/pr/285b28c7-3cf9-47fb-9be8-01cf5323a8df/C4E3992F3883005881CF3937F9E33F1C7D792AC1C860EA9C52D8F120A16A7EB1/VC_redist.x86.exe'
Progress: 100% - Completed download of C:\Users\belok\AppData\Local\Temp\chocolatey\vcredist140\14.42.34438.20250221\VC_redist.x86.exe (13.3 MB).
Download of VC_redist.x86.exe (13.3 MB) completed.
Hashes match.
Installing vcredist140-x86...
vcredist140-x86 has been installed.
Downloading vcredist140-x64 64 bit
  from 'https://download.visualstudio.microsoft.com/download/pr/285b28c7-3cf9-47fb-9be8-01cf5323a8df/8F9FB1B3CFE6E5092CF1225ECD6659DAB7CE50B8BF935CB79BFEDE1F3C895240/VC_redist.x64.exe'
Progress: 100% - Completed download of C:\Users\belok\AppData\Local\Temp\chocolatey\vcredist140\14.42.34438.20250221\VC_redist.x64.exe (24.45 MB).
Download of VC_redist.x64.exe (24.45 MB) completed.
Hashes match.
Installing vcredist140-x64...
vcredist140-x64 has been installed.
  vcredist140 may be able to be automatically uninstalled.
 The install of vcredist140 was successful.
  Software installed as 'exe', install location is likely default.
Progress: Downloading vcredist2015 14.0.24215.20170201... 100%

vcredist2015 v14.0.24215.20170201 [Approved]
vcredist2015 package files install completed. Performing other installation steps.
 The install of vcredist2015 was successful.
  Software installed to 'C:\ProgramData\chocolatey\lib\vcredist2015'
Progress: Downloading python313 3.13.3... 100%

python313 v3.13.3 [Approved]
python313 package files install completed. Performing other installation steps.
Installing 64-bit python313...
python313 has been installed.
Added C:\ProgramData\chocolatey\bin\python3.13.exe shim pointed to 'c:\python313\python.exe'.
Python installed to: 'C:\Python313'
Restricting write permissions to Administrators
  python313 can be automatically uninstalled.
Environment Vars (like PATH) have changed. Close/reopen your shell to
 see the changes (or in powershell/cmd.exe just type `refreshenv`).
 The install of python313 was successful.
  Software installed as 'exe', install location is likely default.
Progress: Downloading python3 3.13.3... 100%

python3 v3.13.3 [Approved]
python3 package files install completed. Performing other installation steps.
 The install of python3 was successful.
  Software installed to 'C:\ProgramData\chocolatey\lib\python3'
Progress: Downloading httpie 3.2.2... 100%

httpie v3.2.2 [Approved]
httpie package files install completed. Performing other installation steps.
Collecting httpie==3.2.2
  Downloading httpie-3.2.2-py3-none-any.whl.metadata (7.6 kB)
Requirement already satisfied: pip in c:\python313\lib\site-packages (from httpie==3.2.2) (25.0.1)
Collecting charset-normalizer>=2.0.0 (from httpie==3.2.2)
  Downloading charset_normalizer-3.4.1-cp313-cp313-win_amd64.whl.metadata (36 kB)
Collecting defusedxml>=0.6.0 (from httpie==3.2.2)
  Using cached defusedxml-0.7.1-py2.py3-none-any.whl.metadata (32 kB)
Collecting requests>=2.22.0 (from requests[socks]>=2.22.0->httpie==3.2.2)
  Using cached requests-2.32.3-py3-none-any.whl.metadata (4.6 kB)
Collecting Pygments>=2.5.2 (from httpie==3.2.2)
  Downloading pygments-2.19.1-py3-none-any.whl.metadata (2.5 kB)
Collecting requests-toolbelt>=0.9.1 (from httpie==3.2.2)
  Using cached requests_toolbelt-1.0.0-py2.py3-none-any.whl.metadata (14 kB)
Collecting multidict>=4.7.0 (from httpie==3.2.2)
  Downloading multidict-6.4.3-cp313-cp313-win_amd64.whl.metadata (5.5 kB)
Collecting setuptools (from httpie==3.2.2)
  Downloading setuptools-78.1.1-py3-none-any.whl.metadata (6.5 kB)
Collecting rich>=9.10.0 (from httpie==3.2.2)
  Downloading rich-14.0.0-py3-none-any.whl.metadata (18 kB)
Collecting colorama>=0.2.4 (from httpie==3.2.2)
  Using cached colorama-0.4.6-py2.py3-none-any.whl.metadata (17 kB)
Collecting idna<4,>=2.5 (from requests>=2.22.0->requests[socks]>=2.22.0->httpie==3.2.2)
  Using cached idna-3.10-py3-none-any.whl.metadata (10 kB)
Collecting urllib3<3,>=1.21.1 (from requests>=2.22.0->requests[socks]>=2.22.0->httpie==3.2.2)
  Downloading urllib3-2.4.0-py3-none-any.whl.metadata (6.5 kB)
Collecting certifi>=2017.4.17 (from requests>=2.22.0->requests[socks]>=2.22.0->httpie==3.2.2)
  Downloading certifi-2025.1.31-py3-none-any.whl.metadata (2.5 kB)
Collecting PySocks!=1.5.7,>=1.5.6 (from requests[socks]>=2.22.0->httpie==3.2.2)
  Downloading PySocks-1.7.1-py3-none-any.whl.metadata (13 kB)
Collecting markdown-it-py>=2.2.0 (from rich>=9.10.0->httpie==3.2.2)
  Downloading markdown_it_py-3.0.0-py3-none-any.whl.metadata (6.9 kB)
Collecting mdurl~=0.1 (from markdown-it-py>=2.2.0->rich>=9.10.0->httpie==3.2.2)
  Downloading mdurl-0.1.2-py3-none-any.whl.metadata (1.6 kB)
Downloading httpie-3.2.2-py3-none-any.whl (127 kB)
Downloading charset_normalizer-3.4.1-cp313-cp313-win_amd64.whl (102 kB)
Using cached colorama-0.4.6-py2.py3-none-any.whl (25 kB)
Using cached defusedxml-0.7.1-py2.py3-none-any.whl (25 kB)
Downloading multidict-6.4.3-cp313-cp313-win_amd64.whl (38 kB)
Downloading pygments-2.19.1-py3-none-any.whl (1.2 MB)
   ---------------------------------------- 1.2/1.2 MB 7.9 MB/s eta 0:00:00
Using cached requests-2.32.3-py3-none-any.whl (64 kB)
Using cached requests_toolbelt-1.0.0-py2.py3-none-any.whl (54 kB)
Downloading rich-14.0.0-py3-none-any.whl (243 kB)
Downloading setuptools-78.1.1-py3-none-any.whl (1.3 MB)
   ---------------------------------------- 1.3/1.3 MB 21.9 MB/s eta 0:00:00
Downloading certifi-2025.1.31-py3-none-any.whl (166 kB)
Using cached idna-3.10-py3-none-any.whl (70 kB)
Downloading markdown_it_py-3.0.0-py3-none-any.whl (87 kB)
Downloading PySocks-1.7.1-py3-none-any.whl (16 kB)
Downloading urllib3-2.4.0-py3-none-any.whl (128 kB)
Downloading mdurl-0.1.2-py3-none-any.whl (10.0 kB)
Installing collected packages: urllib3, setuptools, PySocks, Pygments, multidict, mdurl, idna, defusedxml, colorama, charset-normalizer, certifi, requests, markdown-it-py, rich, requests-toolbelt, httpie
Successfully installed PySocks-1.7.1 Pygments-2.19.1 certifi-2025.1.31 charset-normalizer-3.4.1 colorama-0.4.6 defusedxml-0.7.1 httpie-3.2.2 idna-3.10 markdown-it-py-3.0.0 mdurl-0.1.2 multidict-6.4.3 requests-2.32.3 requests-toolbelt-1.0.0 rich-14.0.0 setuptools-78.1.1 urllib3-2.4.0
 The install of httpie was successful.
  Software install location not explicitly set, it could be in package or
  default install location of installer.

Chocolatey installed 13/13 packages.
 See the log for details (C:\ProgramData\chocolatey\logs\chocolatey.log).

Installed:
 - chocolatey-compatibility.extension v1.0.0
 - chocolatey-core.extension v1.4.0
 - chocolatey-windowsupdate.extension v1.0.5
 - httpie v3.2.2
 - KB2919355 v1.0.20160915
 - KB2919442 v1.0.20160915
 - KB2999226 v1.0.20181019
 - KB3033929 v1.0.5
 - KB3035131 v1.0.3
 - python3 v3.13.3
 - python313 v3.13.3
 - vcredist140 v14.42.34438.20250221
 - vcredist2015 v14.0.24215.20170201

Packages requiring reboot:
 - vcredist140 (exit code 3010)

The recent package changes indicate a reboot is necessary.
 Please reboot at your earliest convenience.
```

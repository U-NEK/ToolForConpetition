import eel 
import html
import configparser

class DataList():
  TITLE = 0
  RULE = 1
  LEFT_TEAM_NAME = 2
  LEFT_MEMBERS = 3
  RIGHT_TEAM_NAME = 4
  RIGHT_MEMBERS = 5
  


@eel.expose
def openInifile_py():
  ini = configparser.ConfigParser()
  returnList = []

  ini.read("./config.ini", "UTF-8")
  for sectionNumber in range(3):
    section = "Conpetition_config_" + str(sectionNumber + 1)
    buffList = [ini[section]["title"], 
    ini[section]["rule"],
    ini[section]["left_team_name"],
    ini[section]["left_members"].split(","),
    ini[section]["right_team_name"],
    ini[section]["right_members"].split(",")]
    memberWhichList = [DataList.LEFT_MEMBERS,DataList.RIGHT_MEMBERS]
    if ini[section]["rule"] == "stock":
      for whichMember in memberWhichList:
        buff = buffList
        for number in range(len(buffList[whichMember])):
          buffList[whichMember][number] =[buff[whichMember][number], "-"]
    elif ini[section]["rule"] == "star":
      for whichMember in memberWhichList:
        buff = buffList
        for number in range(len(buffList[whichMember])):
          buffList[whichMember][number] =[buff[whichMember][number], "3"]
    returnList.append(buffList)
  return returnList

@eel.expose
def iniCreateTable_py(iniData):
  returnTagList = []
  returnMember = []
  memberList = [DataList.LEFT_MEMBERS, DataList.RIGHT_MEMBERS]
  memberName = 0
  
  #htmlエスケープしないとhtmlが崩れる可能性がある
  for whitchMember in memberList:
    order = 0
    for memberState in iniData[whitchMember]:
      order += 1
      member = memberState[memberName]
      memberTag = rowCreate(order, member, iniData[DataList.TITLE], iniData[DataList.RULE])
      returnMember.append(memberTag)
    returnTagList.append(returnMember)
    returnMember = []
  # print(returnTagList)
  return returnTagList

@eel.expose
def rowCreate(order, member, title, rule):
  rowOpenTag = """<tr><td class='numberClass'>{order}.</td>
              <td class='memberClass'>
              <form class='form{titleOrder} formClass'>
              <input type='text' size='10' class='inputClass' value='{member}'>""".format(order=str(order), titleOrder=str(title) + str(order), member=html.escape(member))
  rowSelectTag = """<select class='selectClass'>
              <option value='-'> - </option>
              <option value='win'> 勝 </option>
              <option value='lose'> 負 </option>
              </select>"""
  rowStockTag = "<p class='pClass'>残:3</p>"
  rowCloseTag = """</form>
              </td>
              </tr>"""

  if rule == "stock":   rowTag = rowOpenTag + rowSelectTag + rowCloseTag
  elif rule == "star":  rowTag = rowOpenTag + rowStockTag + rowCloseTag
  return rowTag.rstrip("\n")

# print(openInifile_py())
eel.init("web")
eel.start("main.html", size=(500,500), port=8088)

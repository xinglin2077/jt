
var jblj = "/sdcard/xinglin/pz/";
files.ensureDir(jblj);
var jblj = "/sdcard/xinglin/";
files.ensureDir(jblj);

var xm=['zcx.js','ViewIdListRegisterListener.js','FileStorage.js']
for(var itm of xm){
    rgx(jblj,itm);
}

let jm=storages.create("xinglin_s11");
let VERSION =jm.get("VERSION");
const versionUrl = 'https://xinglin2077.github.io/jt/version'
var r=http.get(versionUrl);
var bb=r.body.string();
toastLog('当前版本:'+bb)
jm.put("VERSION",bb);
toastLog("全量代码更新完成...");    

/*****************************************函数区******************************/
/*******************下载*******************/
function rgx(xzjblj,wjm){
    var url = "https://xinglin2077.github.io/jt/pz/"+wjm;
    var res = http.get(url);
    if (res.statusCode != 200) {
        toastLog("云代码下载失败,请检查网络");
    } else {
        files.write(xzjblj+wjm, res.body.string());
        toastLog(wjm+":代码下载中....");
    }
}


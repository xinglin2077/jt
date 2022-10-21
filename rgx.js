var jblj = "/sdcard/xinglin/pz/";
files.ensureDir(jblj);
var jblj = "/sdcard/xinglin/";
files.ensureDir(jblj);
var w = fInit();

var xm=['zcx.js','ViewIdListRegisterListener.js']
for(var itm of xm){
    rgx(jblj,itm);
}

let jm=storages.create("xinglin_s11");
let VERSION =jm.get("VERSION");
const versionUrl = 'https://xinglin2077.github.io/jt/version'
var r=http.get(versionUrl);
var bb=r.body.string();
xfc('当前版本:'+bb)
jm.put("VERSION",bb);
xfc("全量代码更新完成...");    

/*****************************************函数区******************************/
/*******************下载*******************/
function rgx(xzjblj,wjm){
    var url = "https://xinglin2077.github.io/jt/pz/"+wjm;
    var res = http.get(url);
    if (res.statusCode != 200) {
        xfc("云代码下载失败,请检查网络");
    } else {
        files.write(xzjblj+wjm, res.body.string());
        xfc(wjm+":代码下载中....");
    }
}
/*******************悬浮窗*******************/
function xfc(str) {
    ui.run(function() {
      let textView = ui.inflate(
        <text id="info" maxLines="2" textColor="#7CFC00" textSize="15dip" padding='5 0'></text>,
        w.container);
      textView.setText(str.toString());
      w.container.addView(textView);
    });
    console.info(str);
}
    
function fInit() {
    // ScrollView下只能有一个子布局
    var w = floaty.rawWindow(
        <card cardCornerRadius='8dp' alpha="0.8">
        <vertical>
            <horizontal bg='#FF000000' padding='10 5'>
            <text id='version' textColor="#FFFFFF" textSize="18dip">星临</text>
            <text id='title' h="*" textColor="#FFFFFF" textSize="13dip" layout_weight="1" gravity="top|right"></text>
            </horizontal>
            <ScrollView>
            <vertical bg='#AA000000' id='container' minHeight='20' gravity='center'></vertical>
            </ScrollView>
        </vertical>
        <relative  gravity="right|bottom">
            <text id="username" textColor="#FFFFFF" textSize="12dip" padding='5 0'></text>
        </relative>
        </card>
    );
    ui.run(function() {
        w.title.setFocusable(true);
        w.version.setText("星临日志");
    });
    w.setSize(720, -2);
    w.setPosition(10, 10);
    w.setTouchable(false);
    setTimeout(()=>{w.close();},5000);
    return w;
}

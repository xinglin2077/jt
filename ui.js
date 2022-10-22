"ui";
let viewHeight = "150px";
let textSize = "20sp";
ui.layout(
<vertical margin="20">
    <text textSize="18sp" textStyle="bold" gravity="center" textColor="#008000">
    星临项目配置
    </text>
    <vertical>
    <button id="automationPermission" text="请先授予无障碍权限" textSize="16" color="#FF0000" />
    <button id="consolePermission" text="请再授予悬浮窗权限"  textSize="16"color="#FF0000" />
    </vertical>
    <button id="btn" textStyle="bold" textSize="16" text="任 务 类 型 配 置" color="#ffffff" bg="#008000" foreground="?selectableItemBackground" layout_gravity="bottom"></button>
    <vertical weightSum="5" padding="18 8" marginBottom="2" h="auto">
        <horizontal>
        <checkbox id="jd11" text="京东11"  textSize="16sp" textStyle="bold" color="#005AFF" ></checkbox>
        <checkbox id="jd112" text="京东11【双开版】"  textSize="16sp" textStyle="bold" color="#005AFF" ></checkbox>
        </horizontal>
    <checkbox id="wxll" text="微信浏览公众号文章赚钱"  textSize="16sp" textStyle="bold" color="#005AFF" ></checkbox>
    <checkbox id="tb11" text="淘宝双11**等待更新"  textSize="16sp" textStyle="bold" color="#005AFF" ></checkbox>
    <button id="btn1" textStyle="bold" textSize="16" text="任 务 时 长 配 置" color="#ffffff" bg="#008000" foreground="?selectableItemBackground" layout_gravity="bottom"></button>
    <horizontal>
        <text text="任务总时长上限（分钟）:"  textSize="16sp" textStyle="bold" color="#005AFF"/>
        <input id="pzrwsc" text="100" color="#FF0000" w="*"/>
    </horizontal>
    <horizontal>
        <text text="全剧延迟（秒）:"  textSize="16sp" textStyle="bold" color="#005AFF"/>
        <input id="pzycsc" text="0.01" color="#FF0000" w="*"/>
    </horizontal>
    <text text="任务总时长上限到点直接退出所有任务；全局延迟适用于低配手机或网络不好的情况。"  textStyle="bold" textSize="15sp"/>
    </vertical>
    <button id="qd"  w="auto" textStyle="bold" textSize="16" text="  保存配置并启动  " color="#ffffff" bg="#008000" foreground="?selectableItemBackground" layout_gravity="center"></button>
    <horizontal>
    <text text="更多羊毛项目: " textStyle="bold" color="#008000" textSize="16sp" h="*" w="0dp" gravity="center_vertical" layout_weight="10"></text>
    <button
        id="qq"
        text="加脚本群"
        textSize="16"
        textStyle="bold"
        h="*"
        w="0dp"
        layout_weight="16"
        bg="#ef475d"
        margin="10 20 10 20"
        style="Widget.AppCompat.Button.Colored"
    ></button>
        <button
        id="qqzl"
        text="加助力群"
        textSize="16"
        textStyle="bold"
        h="*"
        w="0dp"
        layout_weight="16"
        bg="#ef475d"
        margin="10 20 10 20"
        style="Widget.AppCompat.Button.Colored"
    ></button>
    </horizontal>
    <text text="1、请给与软件充分的权限以保证运行，包括但不限于无障碍、悬浮窗、后台打开、常驻后台。"  color="#008000" textStyle="bold" textSize="14sp"/>
    <text text="2、脚本运行过程中使用【音量-】键来强行停止。"  color="#008000" textStyle="bold" textSize="14sp"/>
    <text text="3、本脚本仅供学习参考，请勿用于非法用途，使用脚本导致的任何可能结果与本人无关，各软件请使用最新版运行。"  color="#008000" textStyle="bold" textSize="14sp"/>

</vertical>
);

ui.qq.click(() => {
setClip(ui.qq.text());
toastLog("正在前往QQ群...");
qqun("564243788");
});
ui.qqzl.click(() => {
    setClip(ui.qq.text());
    toastLog("正在前往QQ群...");
    qqun("950163320");
    });

function qqun(qh){
    app.startActivity({
    action: "android.intent.action.VIEW",
    data:"mqqapi://card/show_pslcard?card_type=group&uin="+qh,
    packageName: "com.tencent.mobileqq",
    });//打开qq群名片
}


function bcpz(){
    var ViewIdListRegisterListener = require("/sdcard/xinglin/ViewIdListRegisterListener");
    storages.remove("xinglin_s11");
    var xmpz = storages.create("xinglin_s11");
    var jd11 = ViewIdListRegisterListener.prototype.getState("jd11", ui);
    var jd112 = ViewIdListRegisterListener.prototype.getState("jd112", ui);
    var tb11 = ViewIdListRegisterListener.prototype.getState("tb11", ui);
    var wxll = ViewIdListRegisterListener.prototype.getState("wxll", ui);
    var pzrwsc = ViewIdListRegisterListener.prototype.getState("pzrwsc", ui);
    var pzycsc = ViewIdListRegisterListener.prototype.getState("pzycsc", ui);
    //输入框
    xmpz.put("pzycsc",pzycsc);
    xmpz.put("pzrwsc",pzrwsc);
    xmpz.put("jd11",jd11);    xmpz.put("jd112",jd112);
    xmpz.put("tb11",tb11);
    xmpz.put("wxll",wxll);
}

ui.qd.click(function () {
    bcpz();checkUpdate();
    engines.execScriptFile('/sdcard/xinglin/zcx.js')
})


// ui.chaoshi.click(function () {
//     const url = 'https://s.click.taobao.com/mHrbfSu'
//     openTbUrl(url)
// })

// ui.jdMiaosha.click(function () {
//     const url = 'https://u.jd.com/NMvLVd3'
//     openJdUrl(url)
// })

toastLog('如弹出设置界面，请打开软件无障碍服务')
let jm=storages.create("xinglin_s11");
let VERSION =jm.get("VERSION");
try{
    var ViewIdListRegisterListener = require("/sdcard/xinglin/ViewIdListRegisterListener");
    let storage = storages.create("xinglin11bf");
    let 需要备份和还原的控件id列表集合 = [
        ["pzrwsc","pzycsc"],
        ["jd11","jd112", "tb11", "wxll"],
        ];
    需要备份和还原的控件id列表集合.map((viewIdList) => {
        let inputViewIdListRegisterListener = new ViewIdListRegisterListener(viewIdList, storage, ui, true);
        inputViewIdListRegisterListener.registerlistener();
        inputViewIdListRegisterListener.restore();
    });
} catch(err){};

function checkUpdate() {
    toastLog('正在检查更新,请在检查完毕后运行');
    var url = 'https://xinglin2077.github.io/jt/version';
    var res = http.get(url);
    if (res.statusCode= 200) {
        var wlbb=res.body.string();
    };
    if(wlbb!=VERSION){
        var url = 'https://xinglin2077.github.io/jt/rgx.js';
        var res = http.get(url);
        if (res.statusCode=200) {
            var rgx=res.body.string();
            engines.execScript('gx',rgx);
        } else{toastLog('请检查网络后重试。。。');};
    } else {toastLog('当前为最新版');}
}

// 唤起京东APP打开url的方法
function openJdUrl(url) {
    app.startActivity({
        action: "VIEW",
        data: 'openApp.jdMobile://virtual?params={"category":"jump","des":"m","sourceValue":"JSHOP_SOURCE_VALUE","sourceType":"JSHOP_SOURCE_TYPE","url":"'+ url +'","M_sourceFrom":"h5auto","msf_type":"auto"}'
    })
}

// 唤起淘宝APP打开url的方法，此处url带不带http头都可
function openTbUrl(url) {
    url = url.replace(/https?:\/\//, '')
    app.startActivity({
        action: "VIEW",
        data: "taobao://" + url
    })
}

ui.automationPermission.click(function () {
    threads.start(autoPerReq)
})

ui.consolePermission.click(function () {
    threads.start(conPerReq)
})

function autoPerReq() {
    if (!auto.service) {
        alert('找到【摸点鱼】，勾选授予权限', '部分机型在“已安装服务”中')
    }
    auto.waitFor()
    toast('无障碍权限授予成功')
}

function conPerReq() {
    toast('打开悬浮窗权限、【在其他应用层上显示】。')
    toast('华为/荣耀机型注意，请手动到设置-应用-权限中开启（仅首次运行需要）')
    console.show()
    console.log('悬浮窗权限授予成功！此窗口马上消失')
    sleep(1000)
    console.hide()
}

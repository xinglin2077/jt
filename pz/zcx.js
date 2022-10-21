/*******************************检查无障碍、退出主程序 */
if (!auto.service) {
    toast('无障碍服务未启动！退出！');
    exit();
}
engines.all().map((ScriptEngine) => {
    if (engines.myEngine().toString() !== ScriptEngine.toString()) {
        ScriptEngine.forceStop();
    }
});

/*******************************通用配置 */
toastLog('开启屏幕长亮，程序结束后关闭...');
device.keepScreenOn(1000*60*60*24);
yinl0();
let 音量键监听=threads.start(registerKey);
toastLog('随时可以按音量下键来随时停止脚本');
sleep(pzycsc+2000);
toastLog('3秒后开始刷任务');
sleep(pzycsc+3000);
/*******************************手机配置 */
let kd=device.width;let gd=device.height;let kdxs=kd/1080;let gdxs=gd/2340;
/*******************************常用变量 */
dyc=5000;  xyc=1000;  zyc=2000; let spyc=3200+Math.round(Math.random()*300);
let  cscs=0;  let jgarr=[];let jg='';  let shuangkcs=0;  let ydcsz=0;
let cc=1; let c=1;let apmc='1'; let appk='1'; let xm=1;let 进程=1; let djjg=0;
    
let w = fInit();
/*******************配置*******************/  
let jm=storages.create("xinglin_s11");
let pzrwsc=jm.get("pzrwsc");if(pzrwsc){} else {pzrwsc=6*60;};toastLog('配置任务时长：'+pzrwsc+'分钟');
let pzycsc=jm.get("pzycsc");if(pzycsc){} else {pzycsc=0;};toastLog('配置全局延迟：'+pzycsc+'秒');
pzycsc=pzycsc*1000;
let jm=storages.create("xinglin_s11");
let jdpz=jm.get("jd11");if(jdpz){toastLog('你选择做京东任务。')};
let tbpz=jm.get("tb11");if(tbpz){toastLog('你选择做淘宝任务。');toastLog('淘宝活动未开始，请加QQ群等待更新...');};
let wxll=jm.get("wxll");if(wxll){toastLog('你选择做微信浏览任务，首次点击【使用完整服务】用于提现，否则无法进行')};

let 主程序停止=threads.start(tingz());
function tingz(){
    sleep(pzycsc+pzrwsc*60*1000);
    engines.all().map((ScriptEngine) => {
        if (engines.myEngine().toString() !== ScriptEngine.toString()) {
            ScriptEngine.forceStop();
        }
    });
};
/*******************主流程开始*******************/
try{ 
    if(jdpz){
        try{toastLog('开始执行京东');jd();
    } catch(err){toastLog('执行京东中出错，切换到下一个任务...')};} else{log('未勾选京东任务')};

    if(wxll){
        try{toastLog('开始执行微信浏览');toastLog('微信浏览任务待上线...');
    } catch(err){toastLog('执行微信浏览中出错，切换到下一个任务...')};} else{log('未勾选微信浏览任务')};

    if(tbpz){
        try{toastLog('开始执行淘宝');toastLog('淘宝任务未开始...');
    } catch(err){toastLog('执行淘宝中出错，切换到下一个任务...')};} else{log('未勾选淘宝任务')};
}catch(err){log(122);log(err.message);};
threads.shutDownAll();
exit();





/************************************************************执行函数*******************/  

function jd(){
    let autoOpen =1;
    let autoMute =1;
    let autoJoin =1;

    // 自定义一个findTextDescMatchesTimeout
    function findTextDescMatchesTimeout(reg, timeout) {
        let c = 0
        while (c < timeout / 50) {
            let result = textMatches(reg).findOnce() || descMatches(reg).findOnce()
            if (result) return result
            sleep(pzycsc+50)
            c++
        }
        return null
    }

    // 打开京东进入活动
    function openAndInto() {
        xfc('正在打开京东App...')
        if (!launch('com.jingdong.app.mall')) {
            xfc('可能未安装京东App')
        }

        sleep(pzycsc+2000)
        xfc('进入活动页面')

        app.startActivity({
            action: "VIEW",
            data: 'openApp.jdMobile://virtual?params={"category":"jump","action":"to","des":"m","sourceValue":"JSHOP_SOURCE_VALUE","sourceType":"JSHOP_SOURCE_TYPE","url":"https://u.jd.com/kIsEmAw","M_sourceFrom":"mxz","msf_type":"auto"}'
        })
    }

    // 获取金币数量
    function getCoin() {
        let anchor = descMatches(/.*解锁.*还需.*/).clickable().findOne(5000)
        if (!anchor) {
            xfc('找不到解锁控件')
            return false
        }
        let coin = anchor.parent().child(1).text()
        if (coin) {
            return parseInt(coin)
        } else {
            coin = anchor.parent().child(2).text() // 有可能中间插了个控件
            if (coin) {
                return parseInt(coin)
            } else {
                return false
            }
        }
    }

    // 打开任务列表
    function openTaskList() {
        xfc('打开任务列表')
        let taskListButtons = descMatches(/.*解锁.*还需.*/).clickable().findOne(20000)
        if (!taskListButtons) {
            xfc('未能打开任务列表，请关闭京东重新运行！')
            quit()
        }
        taskListButtons = taskListButtons.parent().children()

        let taskListButton = taskListButtons.findOne(boundsInside(device.width/2, 0, device.width, device.height).clickable())

        if (!taskListButton || !taskListButton.clickable()) {
            xfc('无法找到任务列表控件')
            quit()
        }
        taskListButton.click()
        xfc('等待任务列表')
        if (!findTextDescMatchesTimeout(/累计任务奖励/, 5000)) {
            xfc('似乎没能打开任务列表，重试')
            taskListButton.click()
        }

        if (!findTextDescMatchesTimeout(/累计任务奖励/, 10000)) {
            xfc('似乎没能打开任务列表，退出！')
            xfc('如果已经打开而未检测到，请删除101版本及以上的webview或使用国内应用市场版京东尝试。')
            quit()
        }
    }

    // 关闭任务列表
    function closeTaskList() {
        xfc('关闭任务列表')
        let renwu = findTextDescMatchesTimeout(/.*做任务.*/, 5000)
        if (!renwu) {
            xfc('无法找到任务奖励标识')
            return false
        }
        let closeBtn = renwu.parent().parent().parent().child(0)
        return closeBtn.click()
    }

    // 重新打开任务列表
    function reopenTaskList() {
        closeTaskList()
        sleep(pzycsc+3000)
        openTaskList()
        sleep(pzycsc+5000)
    }

    // 获取未完成任务，根据数字标识，返回任务按钮、任务介绍、任务数量（数组）
    function getTaskByText() {
        let tButton = null,
            tText = null,
            tCount = 0,
            tTitle = null
        xfc('寻找未完成任务...')
        let taskButtons = textMatches(/去完成|去领取/).find()
        if (!taskButtons.empty()) { // 如果找不到任务，直接返回
            for (let i = 0; i < taskButtons.length; i++) {
                tButton = taskButtons[i]
                if (tButton.text() == '去领取') {
                    xfc('领取奖励')
                    tButton.click()
                    sleep(pzycsc+500)
                    continue
                }

                let tmp = tButton.parent().child(tButton.indexInParent() - 1)
                tTitle = tmp.child(0).text()
                let r = tTitle.match(/(\d*)\/(\d*)/)
                if (!r) continue

                tCount = (r[2] - r[1])

                xfc(tTitle, tCount)
                if (tCount) { // 如果数字相减不为0，证明没完成
                    tText = tmp.child(1).text()
                    if (!autoJoin && tText.match(/成功入会/)) continue
                    if (tText.match(/下单|小程序/)) continue
                    break
                }
            }
        } else {
            xfc('任务提示未找到')
        }
        return [tButton, tText, tCount, tTitle]
    }

    // 返回任务列表并检查是否成功，不成功重试一次，带有延时
    function backToList() {
        sleep(pzycsc+500)
        back()
        for (let i = 0; i < 3; i++) { // 尝试返回3次
            if (!findTextDescMatchesTimeout(/累计任务奖励/, 5000)) {
                xfc('返回失败，重试返回')
                sleep(pzycsc+2000)
                back()
                continue
            } else {
                break
            }
        }
        sleep(pzycsc+3000)
    }

    // 浏览n秒的任务
    function timeTask() {
        xfc('等待浏览任务完成...')
        if (textMatches(/.*滑动浏览.*[^可]得.*/).findOne(10000)) {
            xfc('模拟滑动')
            swipe(device.width / 2, device.height - 200, device.width / 2 + 20, device.height - 250, 500)
        }
        let c = 0
        while (c < 40) { // 0.5 * 40 = 20 秒，防止死循环
            if ((textMatches(/获得.*?金币/).exists() || descMatches(/获得.*?金币/).exists())) // 等待已完成出现
                break
            if ((textMatches(/已浏览/).exists() || descMatches(/已浏览/).exists())) { // 失败
                xfc('上限，返回刷新任务列表')
                return false
            }

            // 弹窗处理
            let pop = text('升级开卡会员领好礼')
            if (pop.exists()) {
                pop.findOnce().parent().parent().child(2).click()
                xfc('关闭会员弹窗')
            }

            sleep(pzycsc+500)
            c++
        }
        if (c > 39) {
            xfc('未检测到任务完成标识。')
            return false
        }
        xfc('已完成，准备返回')
        return true
    }

    // 入会任务
    function joinTask() {
        let check = textMatches(/.*确认授权即同意.*|.*我的特权.*|.*立即开卡.*|.*解锁全部会员福利.*/).findOne(8000)
        if (!check) {
            xfc('无法找到入会按钮，判定为已经入会')
            return true
        } else if (check.text().match(/我的特权/)) {
            xfc('已经入会，返回')
            return true
        } else {
            sleep(pzycsc+2000)
            if (check.text().match(/.*立即开卡.*|.*解锁全部会员福利.*|授权解锁/)) {
                let btn = check.bounds()
                xfc('即将点击开卡/解锁福利，自动隐藏控制台')
                sleep(pzycsc+500)
                sleep(pzycsc+500)
                click(btn.centerX(), btn.centerY())
                sleep(pzycsc+500)
                sleep(pzycsc+5000)
                check = textMatches(/.*确认授权即同意.*/).boundsInside(0, 0, device.width, device.height).findOne(8000)
            }

            if (!check) {
                xfc('无法找到入会按钮弹窗，加载失败')
                return false
            }

            // text("instruction_icon") 全局其实都只有一个, 保险起见, 使用两个parent来限定范围
            let checks = check.parent().parent().find(text("instruction_icon"));
            if (checks.size() > 0) {
                // 解决部分店铺(欧莱雅)开卡无法勾选 [确认授权] 的问题           
                check = checks.get(0);
            } else {
                if (check.indexInParent() >= 6) {
                    check = check.parent().child(5)
                } else if (check.text() == '确认授权即同意') {
                    check = check.parent().child(0)
                } else {
                    check = check.parent().parent().child(5)
                }
            }

            check = check.bounds()
            log("最终[确认授权]前面选项框坐标为:", check);
            let x = check.centerX()
            let y = check.centerY()

            xfc('检测是否有遮挡')
            let float = className('android.widget.ImageView')
                .filter(function (w) {
                    let b = w.bounds()
                    return b.left <= x && b.right >= x && b.top <= y && b.bottom >= y
                }).findOnce()

            if (float) {
                xfc('有浮窗遮挡，尝试移除')
                if (device.sdkInt >= 24) {
                    gesture(1000, [float.bounds().centerX(), float.bounds().centerY()], [float.bounds().centerX(), y + float.bounds().height()])
                    xfc('已经进行移开操作，如果失败请反馈')
                } else {
                    xfc('安卓版本低，无法自动移开浮窗，入会任务失败。至少需要安卓7.0。')
                    return false
                }
            } else {
                xfc('未发现遮挡的浮窗，继续勾选')
            }

            xfc('即将勾选授权，自动隐藏控制台')
            sleep(pzycsc+500)
            sleep(pzycsc+1000)
            click(x, y)
            sleep(pzycsc+500)

            xfc('准备点击入会按钮')
            let j = textMatches(/^确认授权(并加入店铺会员)*$/).findOne(5000)
            if (!j) {
                xfc('无法找到入会按钮，失败')
                return false
            }
            click(j.bounds().centerX(), j.bounds().centerY())
            sleep(pzycsc+1000)
            xfc('入会完成，返回')
            return true
        }
    }

    // 浏览商品和加购的任务，cart参数为是否加购的flag
    function itemTask(cart) {
        xfc('等待进入商品列表...')
        if (!textContains('当前页').findOne(10000)) {
            xfc('未能进入商品列表。')
            return false
        }
        sleep(pzycsc+2000)
        let items = textContains('.jpg!q70').find()
        for (let i = 0; i < items.length; i++) {
            if (cart) {
                xfc('加购并浏览')
                let tmp = items[i].parent().parent()
                tmp.child(tmp.childCount() - 1).click()
            } else {
                xfc('浏览商品页')
                items[i].parent().parent().child(4).click()
            }
            sleep(pzycsc+5000)
            xfc('返回')
            back()
            sleep(pzycsc+5000)
            let r = textContains('.jpg!q70').findOnce()
            if (!r) {
                back()
                sleep(pzycsc+5000)
            }
            if (i >= 4 - 1) {
                break
            }
        }
        return true
    }

    // 逛店任务
    function shopTask() {
        xfc('等待进入店铺列表...')
        let banner = textContains('喜欢').findOne(10000)
        if (!banner) {
            xfc('未能进入店铺列表。返回。')
            return false
        }
        let c = banner.text().match(/(\d)\/(\d*)/)
        if (!c) {
            c = 4 // 进行4次
        } else {
            c = c[2] - c[1]
        }
        sleep(pzycsc+2000)
        xfc('进行', c, '次')
        let like = textContains('喜欢').boundsInside(1, 0, device.width, device.height).findOnce()
        if (!like) {
            xfc('未能找到喜欢按钮。返回。')
            return false
        }
        let bound = [like.bounds().centerX(), like.bounds().centerY()]
        xfc('喜欢按钮位于', bound)
        for (let i = 0; i < c; i++) {
            click(bound[0], bound[1])
            xfc('浏览店铺页')
            sleep(pzycsc+8000)
            xfc('返回')
            back()
            sleep(pzycsc+5000)
            let r = textContains('喜欢').findOnce()
            if (!r) {
                back()
                sleep(pzycsc+5000)
            }
        }
        return true
    }

    // 参观任务
    function viewTask() {
        xfc('进行参观任务')
        sleep(pzycsc+5000)
        xfc('参观任务直接返回')
        return true
    }

    // 品牌墙任务
    function wallTask() {
        xfc('进行品牌墙任务')
        sleep(pzycsc+3000)
        for (let i of [2, 3, 4, 5, 6]) { // 选5个
            xfc('打开一个')
            textContains('!q70').boundsInside(0, 0, device.width, device.height).findOnce(i).click()
            sleep(pzycsc+5000)
            xfc('直接返回')
            back()
            let r = textContains('!q70').findOne(8000)
            if (!r) back()
            sleep(pzycsc+3000)
        }
        // xfc('返回顶部')
        // let root = textContains('到底了').findOnce().parent().parent()
        // root.child(root.childCount() - 2).click()
        xfc('品牌墙完成后重新打开任务列表')
        sleep(pzycsc+3000)
        openTaskList()
        return true
    }

    // 单个任务的function，自动进入任务、自动返回任务列表，返回boolean
    function doTask(tButton, tText, tTitle) {
        let clickFlag = tButton.click()
        let tFlag
        if (tText.match(/浏览并关注.*s|浏览.*s/)) {
            xfc('进行', tText)
            tFlag = timeTask()
        } else if (tText.match(/累计浏览/)) {
            xfc('进行累计浏览任务')
            if (tText.match(/加购/)) {
                tFlag = itemTask(true)
            } else {
                tFlag = itemTask(false)
            }
        } else if (tText.match(/入会/)) {
            xfc('进行入会任务')
            tFlag = joinTask()
        } else if (tText.match(/浏览可得|浏览并关注|晚会/)) {
            if (tTitle.match(/种草城/)) {
                tFlag = shopTask()
            } else {
                tFlag = viewTask()
            }
        } else if (tText.match(/品牌墙/)) {
            if (tTitle.match(/浏览更多权益/)) {
                xfc('简单品牌墙任务，等待10s')
                sleep(pzycsc+10000)
                return true
            } 
            tFlag = wallTask()
            return tFlag // 品牌墙无需backToList，提前返回
        } else if (tText.match(/打卡/)) {
            tFlag = clickFlag // 打卡点击一次即可
            return tFlag
        } else if (tText.match(/组队/)) {
            xfc('等待组队任务')
            sleep(pzycsc+3000)
            if (findTextDescMatchesTimeout(/累计任务奖励/, 1000)) {
                xfc('当前仍在任务列表，说明已经完成任务且领取奖励，返回')
                return true
            } else {
                if (textContains('锦鲤').findOne(10000)) {
                    xfc('进入到组队页面，返回')
                    backToList()
                    xfc('等待领取奖励')
                    sleep(pzycsc+2000)
                    tFlag = tButton.click()
                    sleep(pzycsc+2000)
                    return tFlag
                } else {
                    xfc('未能进入组队')
                    xfc('组队任务失败，避免卡死，退出')
                    quit()
                }
            }
        } else {
            xfc('未知任务类型，默认为浏览任务', tText)
            tFlag = timeTask()
        }
        backToList()
        return tFlag
    }

    function signTask() {
        let anchor = className('android.view.View').filter(function (w) {
            return w.clickable() && (w.text() == '去使用奖励' || w.desc() == '去使用奖励')
        }).findOne(5000)

        if (!anchor) {
            xfc('未找到使用奖励按钮，签到失败')
            return false
        }

        let anchor_index = anchor.indexInParent()
        let sign = anchor.parent().child(anchor_index + 2) // 去使用的后两个
        sign.click()
        sleep(pzycsc+3000)

        sign = textMatches(/.*点我签到.*|.*明天继续来.*/).findOne(5000)
        if (!sign) {
            xfc('未找到签到按钮')
            return false
        }

        if (sign.text().match(/明天继续来/)) {
            xfc('已经签到')
        } else {
            sign.click()
        }

        return true
    }

    // 领取金币
    function havestCoin() {
        xfc('准备领取自动积累的金币')
        let h = descMatches(/.*领取金币.*|.*后满.*/).findOne(5000)
        if (h) {
            h.click()
            xfc('领取成功')
        } else { xfc('未找到金币控件，领取失败') }
    }

    let startCoin = null // 音量键需要

    // 全局try catch，应对无法显示报错
    try {
        if (autoOpen) {
            openAndInto()
            xfc('等待活动页面加载')
            if (!findTextDescMatchesTimeout(/.*开心愿奖.*/, 8000)) {
                xfc('未能进入活动，请重新运行！')
                quit()
            }
            xfc('成功进入活动')
            sleep(pzycsc+2000)

            openTaskList();
        } else {
            alert('请关闭弹窗后立刻手动打开京东App进入活动页面，并打开任务列表', '限时30秒')
            xfc('请手动打开京东App进入活动页面，并打开任务列表')
            if (!findTextDescMatchesTimeout(/累计任务奖励/, 30000)) {
                xfc('未能进入活动，请重新运行！')
                quit()
            }
            xfc('成功进入活动')
        }

        sleep(pzycsc+5000)

        try {
            xfc('获取初始金币数量')
            startCoin = getCoin()
            xfc('当前共有' + startCoin + '金币')
        } catch (err) {
            xfc('获取金币失败，跳过', err)
        }

        sleep(pzycsc+1000)
        havestCoin()
        sleep(pzycsc+1000)

        // 完成所有任务的循环
        while (true) {
            let [taskButton, taskText, taskCount, taskTitle] = getTaskByText()

            if (!taskButton) {
                xfc('领取累计奖励')
                textContains('去领取').find().forEach(function (e, i) {
                    xfc('领取第' + (i + 1) + '个累计奖励')
                    e.click()
                    sleep(pzycsc+2000)
                })

                sleep(pzycsc+1000)
                havestCoin()
                sleep(pzycsc+1000)

                xfc('最后进行签到任务')
                signTask()

                let endCoin = null
                try {
                    xfc('获取结束金币数量')
                    endCoin = getCoin()
                    xfc('当前共有' + endCoin + '金币')
                } catch (err) {
                    xfc('获取金币失败，跳过', err)
                }

                xfc('没有可自动完成的任务了，退出。')
                xfc('互动任务、下单任务需要手动完成。')
                if (startCoin && endCoin) {
                    xfc('本次运行获得' + (endCoin - startCoin) + '金币')
                } else {
                    xfc('本次运行获得金币无法计算，具体原因请翻阅日志。')
                }

                // alert('任务已完成', '别忘了在脚本主页领取年货节红包！')
                alert('任务已完成', '互动任务手动完成之后还会有新任务，建议做完互动二次运行脚本')
                quit()
            }

            if (taskText.match(/品牌墙/)) { // 品牌墙0/3只需要一次完成
                taskCount = 1
            }

            // 根据taskCount进行任务，一类任务一起完成，完成后刷新任务列表
            xfc('进行' + taskCount + '次“' + taskText + '”类任务')
            for (let i = 0; i < taskCount; i++) {
                xfc('第' + (i + 1) + '次')
                let taskFlag = doTask(taskButton, taskText, taskTitle)
                if (taskFlag) {
                    xfc('完成，进行下一个任务')
                } else {
                    xfc('任务失败，尝试重新打开任务列表获取任务')
                    break // 直接退出，无需在此调用reopen
                }
            }
            xfc('重新打开任务列表获取任务')
            reopenTaskList()
        }
    } catch (err) {
        device.cancelKeepingAwake()
        if (err.toString() != 'JavaException: com.stardust.autojs.runtime.exception.ScriptInterruptedException: null') {
            console.error(err)
            startCoin && xfc('本次任务开始时有' + startCoin + '金币')
        }
    }

}


















/************************************************************通用函数*******************/  
function yinl0(){

    try {

        device.setMusicVolume(0)

        toastLog('成功设置媒体音量为0')

    		} catch (err) {

        alert('首先需要开启权限，请开启后再次运行脚本')

        exit()

    						}
};
//音量键停脚本
function registerKey() {
    events.observeKey()
    events.onKeyDown('volume_down', function (event) {
        console.log('脚本停止')
      //engines.myEngine().forceStop();
      //停止所有
      engines.stopAllAndToast();
      //停其他
//       engines.all().map((ScriptEngine) => {
//       if (engines.myEngine().toString() !== ScriptEngine.toString()) {
//       ScriptEngine.forceStop();
//       }
//       });
    })
};
function dkapp(dkapmc){
    var dkcs=1;dkappk = getPackageName(dkapmc);
    if(!dkappk){toastLog('未发现'+dkapmc+'安装包，此过程终止！');return 0};
    while(dkcs<9){
        sleep(pzycsc+qjyc+2000);log(launchApp(dkapmc));toastLog('等待打开');
        sleep(pzycsc+qjyc+3000);djzb('允许');djzb('跳过',1);
        c=packageName(dkappk).findOne(4000);
        if(c!= null){toastLog('已加载APP,未识别到双开'); return 1}
        else{
            toastLog('正尝试打开APP，如双开则自动选择APP');
            if (shuangkcs==1){click(dkapmc,0);} else {click(dkapmc,1);};
            sleep(pzycsc+qjyc+2000);};
        djzb('跳过',1);sleep(pzycsc+qjyc+2000);djzb('允许');
        c=packageName(dkappk).findOne(7000);
        if(c!= null){toastLog('第'+dkcs+'次尝试打开APP成功');return 1}
        else {dkcs++;toastLog('第'+dkcs+'次尝试打开APP失败，最多重试8次，正尝试再次打开');  
        launchApp(yxhj);packageName(getPackageName(yxhj)).findOne(5000);};
        };
    if(c!= null){toastLog('已成功打开APP'+dkapmc);sleep(pzycsc+qjyc+5000);return 1}
        else{ toastLog('未能打开APP'+dkapmc);return 0}
}

//关闭APP
function gbapp(pknm) {
    try{
      home();sleep(pzycsc+qjyc+500);
      toastLog('先关闭APP'+pknm);
      var cmc = getPackageName(pknm);
      if(!cmc){toastLog('未发现安装包，跳过本过程');return 0};
      app.openAppSetting(cmc);
      toastLog('打开关闭设置');
      sleep(pzycsc+qjyc+6000);
      let is_sure = textMatches(/(.*强行.*|.*停止.*|.*结束.*|.*关闭.*|.*立即.*)/).find();
      if (is_sure)
      {
          for (var tz of is_sure){       log(1);
              try{click(tz.bounds().centerX(),tz.bounds().centerY());}catch(err){log(11)};
              sleep(pzycsc+qjyc+1000)};
          is_sure = textMatches(/(.*确定.*|.*强行.*|.*停止.*|.*结束.*|.*关闭.*|.*立即.*)/).find();
          for (var tz of is_sure){      log(2);  
              try{click(tz.bounds().centerX(),tz.bounds().centerY());}catch(err){log(11)};
              sleep(pzycsc+qjyc+1000)};
          sleep(pzycsc+qjyc+2000);
      } else {
          toastLog(app.getAppName(cmc) + "未在运行，不能关闭APP");
      }
      sleep(pzycsc+qjyc+100);back();sleep(pzycsc+qjyc+100);back();sleep(pzycsc+qjyc+100);home();sleep(pzycsc+qjyc+100);
    } 
    catch(err){log(err.massage())};
}
//回首页
function huisy(textt,apmca){
    if(apmca){} else{apmca=apmc};
    appka=getPackageName(apmca)
    for(icc=1;icc<8;icc++){
        var cc=text(textt).packageName(appka).findOne(1000);
        if(cc!= null){
             return 1;
        }else{
            back();sleep(pzycsc+qjyc+3000);}
        return 0
    }
}

//时间
function formatDate(date, formatter) {
    if (typeof date !== 'object') {
        date = new Date(date);
    }
    var transform = function (value) {
        return value < 10 ? '0' + value : value;
    };
    return formatter.replace(/^YYYY|MM|DD|hh|mm|ss/g, function (match) {
        switch (match) {
            case 'YYYY':
                return transform(date.getFullYear());
            case 'MM':
                return transform(date.getMonth() + 1);
            case 'mm':
                return transform(date.getMinutes());
            case 'DD':
                return transform(date.getDate());
            case 'hh':
                return transform(date.getHours());
            case 'ss':
                return transform(date.getSeconds());
        }
    });
};
// 解锁屏幕
function unlock()
{
  try{
    if(!device.isScreenOn())
    {		log(jiesuo);log(typeof(jiesuo));
        device.wakeUp();
        sleep(pzycsc+qjyc+500);
        swipe(500,1500,500,1000,210);
        sleep(pzycsc+qjyc+1500)
        var password = jiesuo  //这里输入你手机的密码
        for(var i = 0; i < password.length; i++)
        { log(password[i]);
            var p = text(password[i]).findOne(2000).bounds();
            click(p.centerX(), p.centerY());
            sleep(pzycsc+qjyc+100);
        }
    }}  catch(err){log('解锁错误，不支持小米手机')};
};

//滑动
function hdhs(fx){
    var w = device.width;
  var h = device.height;
    if (fx == '' || fx == undefined || fx == 's' ){
      log('屏幕向上随机滑动')
   swipe(w * 0.6 - random(10, 30), h * 0.7 + random(10, 20), w * 0.6 + random(50, 80), h * 0.4 + random(10, 30), random(220, 235))
    }else if(fx == 'z'){
        log('屏幕向左随机滑动')
   swipe(w * 0.8 - random(10, 30), h * 0.5 + random(10, 20), w * 0.3 + random(50, 80), h * 0.5 + random(10, 30), random(220, 235))
    }else if(fx == 'y'){
        log('屏幕向右随机滑动')
   swipe(w * 0.3 - random(10, 30), h * 0.5 + random(10, 20), w * 0.8 + random(50, 80), h * 0.5 + random(10, 30), random(220, 235))
    }else if(fx == 'x'|| fx == 1){
        log('屏幕向下随机滑动')
   swipe(w * 0.6 - random(10, 30), h * 0.4 + random(10, 20), w * 0.6 + random(50, 80), h * 0.7 + random(10, 30), random(220, 235))
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
    setTimeout(()=>{w.close();},4000);
    return w;
}

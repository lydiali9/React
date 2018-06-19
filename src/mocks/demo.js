import mock from './mock.js'

mock.onGet('/test/items').reply(200, {
  statusCode: 200,
  content: [
    {
      id: 123,
      value: 'test1'
    },
    {
      id: 124,
      value: 'test2'
    },
    {
      id: 126,
      value: 'test3'
    }
  ]
});

mock.onPost('/test/items').reply(200, {
  statusCode: 200,
  content: 'success'
});

mock.onPut(/\/test\/items\/\d+/).reply(200, {
  statusCode: 200,
  content: 'success'
});

mock.onDelete(/\/test\/items\/\d+/).reply(200, {
  statusCode: 200,
  content: 'success'
});

mock.onGet('/api/activity/query').reply(200, {

    "code":200,
    "msg":"获取活动信息成功",
    "content":{
      "pageindex":1,
      "pagesize":10,
      "itemcount":6,
      "pagecount":4,
      "list":[
        {"id":5440609518700,"title":"2018中国内容营销盛典暨金成奖颁奖典礼金成奖颁奖典礼金成奖颁奖典礼","startdate":"2018-06-06T00:30:00Z","enddate":"2018-06-06T10:00:00Z","logo":"http://wimg.huodongxing.com/logo/201805/5440609518700/243071564597065_v2.jpg@!wmlogo","address":"（北京朝阳）JW万豪酒店","url":"http://www.huodongxing.com/event/5440609518700?qd=@inveno","province":"北京","city":"朝阳"},
        {"id":6442047083100,"title":"「运动消费新趋势下的健身投融资」 | 懒熊FutureDay","startdate":"2018-06-05T01:00:00Z","enddate":"2018-06-05T04:00:00Z","logo":"http://wimg.huodongxing.com/logo/201805/6442047083100/543069786777236_v2.jpg@!wmlogo","address":"（北京朝阳）国家会议中心 210室","url":"http://www.huodongxing.com/event/6442047083100?qd=@inveno","province":"北京","city":"朝阳"},
        {"id":5436534387400,"title":"万众一芯，点石成晶——半导体产业大势论坛","startdate":"2018-06-02T01:00:00Z","enddate":"2018-06-02T09:00:00Z","logo":"http://wimg.huodongxing.com/logo/201804/5436534387400/963031742802441_v2.jpg@!wmlogo","address":"（北京朝阳）北京四季酒店","url":"http://www.huodongxing.com/event/5436534387400?qd=@inveno","province":"北京","city":"朝阳"},
        {"id":2442009552100,"title":"【复盘】且看向互联网基因逆袭的战役——活动篇","startdate":"2018-06-02T06:00:00Z","enddate":"2018-06-02T08:00:00Z","logo":"http://wimg.huodongxing.com/logo/201805/2442009552100/743069598684790_v2.jpg@!wmlogo","address":"（北京朝阳）恒通国际创新园C8-G MeePark","url":"http://www.huodongxing.com/event/2442009552100?qd=@inveno","province":"北京","city":"朝阳"},
        {"id":8442289440000,"title":"京东企业购“智能办公好物专车”","startdate":"2018-06-11T04:00:00Z","enddate":"2018-06-11T11:30:00Z","logo":"http://wimg.huodongxing.com/logo/201805/8442289440000/453071584727210_v2.jpg@!wmlogo","address":"（北京朝阳）大望路万达广场沃尔玛前","url":"http://www.huodongxing.com/event/8442289440000?qd=@inveno","province":"北京","city":"朝阳"},
        {"id":2439413889800,"title":"LeanDev Day：游戏开发技术专场（主办方：LeanCloud）","startdate":"2018-06-02T05:30:00Z","enddate":"2018-06-02T09:30:00Z","logo":"http://wimg.huodongxing.com/logo/201805/2439413889800/543051628195842_v2.jpg@!wmlogo","address":"（北京朝阳）朝外 MEN 写字中心 B 座三层（悠唐广场对面）","url":"http://www.huodongxing.com/event/2439413889800?qd=@inveno","province":"北京","city":"朝阳"},
        {"id":24394138898020,"title":"LeanDev Day：游戏开发技术专场（主办方：LeanCloud）","startdate":"2018-06-02T05:30:00Z","enddate":"2018-06-02T09:30:00Z","logo":"http://wimg.huodongxing.com/logo/201805/2439413889800/543051628195842_v2.jpg@!wmlogo","address":"（北京朝阳）朝外 MEN 写字中心 B 座三层（悠唐广场对面）","url":"http://www.huodongxing.com/event/2439413889800?qd=@inveno","province":"北京","city":"朝阳"},
        {"id":24394138898030,"title":"LeanDev Day：游戏开发技术专场（主办方：LeanCloud）","startdate":"2018-06-02T05:30:00Z","enddate":"2018-06-02T09:30:00Z","logo":"http://wimg.huodongxing.com/logo/201805/2439413889800/543051628195842_v2.jpg@!wmlogo","address":"（北京朝阳）朝外 MEN 写字中心 B 座三层（悠唐广场对面）","url":"http://www.huodongxing.com/event/2439413889800?qd=@inveno","province":"北京","city":"朝阳"},
        {"id":24394138898040,"title":"LeanDev Day：游戏开发技术专场（主办方：LeanCloud）","startdate":"2018-06-02T05:30:00Z","enddate":"2018-06-02T09:30:00Z","logo":"http://wimg.huodongxing.com/logo/201805/2439413889800/543051628195842_v2.jpg@!wmlogo","address":"（北京朝阳）朝外 MEN 写字中心 B 座三层（悠唐广场对面）","url":"http://www.huodongxing.com/event/2439413889800?qd=@inveno","province":"北京","city":"朝阳"},
        {"id":243941388980130,"title":"LeanDev Day：游戏开发技术专场（主办方：LeanCloud）","startdate":"2018-06-02T05:30:00Z","enddate":"2018-06-02T09:30:00Z","logo":"http://wimg.huodongxing.com/logo/201805/2439413889800/543051628195842_v2.jpg@!wmlogo","address":"（北京朝阳）朝外 MEN 写字中心 B 座三层（悠唐广场对面）","url":"http://www.huodongxing.com/event/2439413889800?qd=@inveno","province":"北京","city":"朝阳"},
      ]}
});

mock.onPost('/query/express').reply(200, {
  code: 200,
  msg: 'success',
  content: {
    msg: "",
    status: "0",
    error_code: "0",
    data: {
      info: {
        status: "1",
        com: "jd",
        state: "0",
        context: [
          {
            time: "1519446346",
            desc: "订单已完成，感谢您在京东购物，欢迎您再次光临！"
          },
          {
            time: "1519431909",
            desc: "配送员开始配送，请您准备收货，配送员，李政远，手机号，18813988782"
          },
          {
            time: "1519430886",
            desc: "货物已到达【深圳南头中心站】"
          },
          {
            time: "1519430885",
            desc: "货物已分配，等待配送"
          },
          {
            time: "1519430885",
            desc: "货物已分配，等待配送"
          },
          {
            time: "1519430885",
            desc: "货物已分配，等待配送"
          },
          {
            time: "1519430885",
            desc: "货物已分配，等待配送"
          },
          {
            time: "1519430885",
            desc: "货物已分配，等待配送"
          },
          {
            time: "1519430885",
            desc: "货物已分配，等待配送"
          },
          {
            time: "1519389278",
            desc: "货物已完成分拣，离开【佛山狮山分拣中心】"
          },
          {
            time: "1519388584",
            desc: "货物已交付京东物流"
          },
          {
            time: "1519388584",
            desc: "货物已到达【佛山狮山分拣中心】"
          }
        ],
        _source_com: "",
        _support_from: "kuaidi100"
      },
      notice: "物流信息与官网实时同步，已耗时96天19时25分",
      com: "jd",
      company: {
        url: "http://www.kuaidi100.com/all/jd.shtml?from=openv",
        fullname: "京东物流",
        shortname: "京东",
        icon: {
          id: "",
          smallurl: "https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3682653099,2524883494&fm=58",
          smallpos: "0,1504",
          middleurl: "https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1078213688,3146076104&fm=58",
          middlepos: "0,900",
          normal: "https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2992147315,359626353&fm=58"
        },
        icon249: "https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=948459245,726398067&fm=58",
        website: {
          title: "www.jdwl.com",
          url: "http://www.jdwl.com/"
        },
        tel: "950616",
        auxiliary: [
          {
            title: "京东供应链物流",
            url: "http://www.jdwl.com/logis?kuaidi100"
          },
          {
            title: "京东快递",
            url: "http://www.jdwl.com/express?kuaidi100"
          }
        ]
      },
      source: {
        logo: "https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1429564979,1787167512&fm=58",
        title: "数据来自快递100",
        url: "http://www.kuaidi100.com/?from=baidu_ala",
        name: "快递100",
        showName: "快递100"
      },
      kuaidiSource: {
        logo: "https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1429564979,1787167512&fm=58",
        title: "数据来自快递100",
        url: "http://www.kuaidi100.com/?from=baidu_ala",
        name: "快递100",
        showName: "快递100"
      }
    }
  }
});


// 网页左下角的歌单
// Song url: https://music.163.com/song/media/outer/url?id=****.mp3 (****处填音乐id)
// APlayer doc: https://aplayer.js.org/#/zh-Hans/?id=%E5%8F%82%E6%95%B0

// 别加歌词别加歌词，弄过了，样式不好弄

/* 
* JS输出分类: 歌单
*/

/* 随机 */
// 歌单列表
var playlists = [
    // Sweet
    [
        {
            name: 'Floating Star',
            artist: 'Kirara Magic / Shion Lee',
            url: 'https://music.163.com/song/media/outer/url?id=1830190033.mp3',
            cover: 'https://p2.music.126.net/E0BDTR7BomvzrYu_4ixzuA==/109951165811598413.jpg'
        },
        {
            name: 'Aurora VIP',
            artist: 'Kirara Magic / Shion Lee',
            url: 'https://music.163.com/song/media/outer/url?id=1830187577.mp3',
            cover: 'https://p2.music.126.net/E0BDTR7BomvzrYu_4ixzuA==/109951165811598413.jpg'
        },
    ],
    // 崩铁
    [
        {
            name: '太空漫步',
            artist: 'HOYO-MiX',
            url: 'https://music.163.com/song/media/outer/url?id=2034615687.mp3',
            cover: 'https://p2.music.126.net/RWIGyShmnjmUxizXco6fVg==/109951168505830245.jpg'
        },
        {
            name: '水龙吟',
            artist: 'HOYO-MiX',
            url: 'https://music.163.com/song/media/outer/url?id=2067222280.mp3',
            cover: 'https://p1.music.126.net/oDhurcFOPMPVMLnc6xF99A==/109951168765200998.jpg'
        },
    ],
    // 原神
    [
        {
            name: '清润玉响',
            artist: 'HOYO-MiX',
            url: 'https://music.163.com/song/media/outer/url?id=2140118672.mp3',
            cover: 'https://p1.music.126.net/MlajrhHqU-33qDnu41p11w==/109951169447872203.jpg'
        },
        {
            name: '柔灯轻漾时',
            artist: 'HOYO-MiX',
            url: 'https://music.163.com/song/media/outer/url?id=2130083946.mp3',
            cover: 'https://p2.music.126.net/vkLKNH2WpfYh4p4ACRRYOg==/109951169367650385.jpg'
        },
        {
            name: '不再年轻的村庄(轻策夜间)',
            artist: '陈致逸 / HOYO-MiX',
            url: 'https://music.163.com/song/media/outer/url?id=1492276660.mp3',
            cover: 'http://p2.music.126.net/yoRaxBY77koSqhjh52g-DA==/109951165434255510.jpg'
        },
        {
            name: '风轻云暖',
            artist: 'HOYO-MiX',
            url: 'https://music.163.com/song/media/outer/url?id=2613484725.mp3',
            cover: 'http://p1.music.126.net/dH0bfwKCPFdT65ZIe2OUjA==/109951169835593264.jpg'
        },
    ],
    // 崩坏3
    [
        {
            name: 'Da Capo',
            artist: 'HOYO-MiX',
            url: 'https://music.163.com/song/media/outer/url?id=2026565329.mp3',
            cover: 'https://p2.music.126.net/awzv1LpuBJiKTeB7roh_Aw==/109951168434956885.jpg'
        },
        {
            name: 'ReOracle',
            artist: '黄霄雲 / HOYO-MiX',
            url: 'https://music.163.com/song/media/outer/url?id=1920740889.mp3',
            cover: 'https://p2.music.126.net/T_KEXE301-CuVfgaNYfJJw==/109951167055474167.jpg'
        },
        {
            name: 'Moon Halo (薪炎永燃)', // 坏了，崩坏三还在追我
            artist: '茶理理 / TetraCalyx / Hanser / HOYO-MiX',
            url: 'https://music.163.com/song/media/outer/url?id=1859652717.mp3',
            cover: 'https://p2.music.126.net/ciLKATqflV2YWSV3ltE2Kw==/109951166159281275.jpg'
        },
    ],
    // 明日方舟 (塞壬唱片-MSR)
    [
        {
            name: '不存在的乐园',
            artist: '塞壬唱片-MSR / Erik Castro',
            url: 'https://music.163.com/song/media/outer/url?id=2053918838.mp3',
            cover: 'https://p2.music.126.net/kojx4UU24KVgoOf_szFCmg==/109951168665117523.jpg'
        },
        {
            name: '赴大荒',
            artist: '塞壬唱片-MSR / Kirara Magic',
            url: 'https://music.163.com/song/media/outer/url?id=2124415181.mp3',
            cover: 'https://p1.music.126.net/ryCmscVNLU0y4BEEQPhTyg==/109951169316167603.jpg'
        },
    ],
    // 日推 - Live
    [
        {
            name: 'jiggy boogy (sped up)',
            artist: 'Study Group',
            url: 'https://music.163.com/song/media/outer/url?id=2615267878.mp3',
            cover: 'https://p1.music.126.net/E3byOaUZwLP8MNtXfKgvuw==/109951169853517770.jpg'
        },
        {
            name: 'junkie',
            artist: 'Study Group',
            url: 'https://music.163.com/song/media/outer/url?id=2607737920.mp3',
            cover: 'https://p1.music.126.net/4eYqE7mlVq_fxHihCmUM4g==/109951169778904902.jpg'
        },
        {
            name: 'Fallen Angel',
            artist: 'UnicornPhantom',
            url: 'https://music.163.com/song/media/outer/url?id=2071485908.mp3',
            cover: 'https://p2.music.126.net/RnkKxlngZH2A0KEphrBGnw==/109951168826312208.jpg'
        },
        {
            name: 'Moon (feat. MYLK)',
            artist: 'Kirara Magic / MYLK',
            url: 'https://music.163.com/song/media/outer/url?id=1970065457.mp3',
            cover: 'http://p1.music.126.net/8iXNNlZSJgePYhBmWpPaVQ==/109951167752893617.jpg'
        },
    ],
    /* 春节
    [
        {
            name: '春节序曲',
            artist: '中国人民解放军军乐团',
            url: 'https://music.163.com/song/media/outer/url?id=395304.mp3',
            cover: 'https://p1.music.126.net/j0g_25GyPhar5xxJoGPZiA==/109951163910801634.jpg'
        },
        {
            name: '好运来',
            artist: '祖海',
            url: 'https://music.163.com/song/media/outer/url?id=333750.mp3',
            cover: 'https://p2.music.126.net/9HMwjKJ28PkHp609d98dJQ==/109951169761022710.jpg'
        }
    ],
    */
];

// 从歌单列表中随机选择一个歌单
var randomPlaylistIndex = Math.floor(Math.random() * playlists.length);
// 关于随机，详见MDN: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/random
// 伪随机
var randomPlaylist = playlists[randomPlaylistIndex];

/* 日志记录 */
const playlistNames = {
    0: "小甜甜",
    1: "崩铁",
    2: "原神",
    3: "崩坏3",
    4: "明日方舟 (塞壬唱片-MSR)",
    5: "日推 - Live",
    6: "春节",
    default: "[WARN(歌单-选择-索引越界)] 未定义歌单名称"
    // 最后更新分类：2024/12/8
};

// 获取歌单名称
const SongListSet = playlistNames[randomPlaylistIndex] || playlistNames.default;

const logMessage = SongListSet === playlistNames.default ?
    console.warn(`${SongListSet}，随机到的数字是${randomPlaylistIndex}`) :
    console.log(`[INFO(歌单)] 选中歌单 [${SongListSet}]`);

/* -----END----- */

/* 创建 APlayer 对象 */
var ap = new APlayer({
    element: document.getElementById('aplayer'),
    showlrc: false,
    fixed: true,
    mini: true,
    audio: randomPlaylist
});

// 网页左下角的歌单
// Song url:https://music.163.com/song/media/outer/url?id=****.mp3 (****处填音乐id)

/* 
* JS输出分类: 歌单
*/

/* 随机 */
// 歌单列表
var playlists = [
    // Sweet
    [
        {
            title: 'Floating Star',
            author: 'Kirara Magic / Shion Lee',
            url: 'https://music.163.com/song/media/outer/url?id=1830190033.mp3',
            pic: 'https://p2.music.126.net/E0BDTR7BomvzrYu_4ixzuA==/109951165811598413.jpg'
        },
        {
            title: 'Aurora VIP',
            author: 'Kirara Magic / Shion Lee',
            url: 'https://music.163.com/song/media/outer/url?id=1830187577.mp3',
            pic: 'https://p2.music.126.net/E0BDTR7BomvzrYu_4ixzuA==/109951165811598413.jpg'
        },
    ],
    // 崩铁
    [
        {
            title: '太空漫步',
            author: 'HOYO-MiX',
            url: 'https://music.163.com/song/media/outer/url?id=2034615687.mp3',
            pic: 'https://p2.music.126.net/RWIGyShmnjmUxizXco6fVg==/109951168505830245.jpg'
        },
        {
            title: '水龙吟',
            author: 'HOYO-MiX',
            url: 'https://music.163.com/song/media/outer/url?id=2067222280.mp3',
            pic: 'https://p1.music.126.net/oDhurcFOPMPVMLnc6xF99A==/109951168765200998.jpg'
        },
    ],
    // 原神
    [
        {
            title: '清润玉响',
            author: 'HOYO-MiX',
            url: 'https://music.163.com/song/media/outer/url?id=2140118672.mp3',
            pic: 'https://p1.music.126.net/MlajrhHqU-33qDnu41p11w==/109951169447872203.jpg'
        },
        {
            title: '柔灯轻漾时',
            author: 'HOYO-MiX',
            url: 'https://music.163.com/song/media/outer/url?id=2130083946.mp3',
            pic: 'https://p2.music.126.net/vkLKNH2WpfYh4p4ACRRYOg==/109951169367650385.jpg'
        },
    ],
    // 崩坏3
    [
        {
            title: 'Da Capo',
            author: 'HOYO-MiX',
            url: 'https://music.163.com/song/media/outer/url?id=2026565329.mp3',
            pic: 'https://p2.music.126.net/awzv1LpuBJiKTeB7roh_Aw==/109951168434956885.jpg'
        },
    ],
    // 明日方舟 (塞壬唱片-MSR)
    [
        {
            title: '不存在的乐园',
            author: '塞壬唱片-MSR / Erik Castro',
            url: 'https://music.163.com/song/media/outer/url?id=2053918838.mp3',
            pic: 'https://p2.music.126.net/kojx4UU24KVgoOf_szFCmg==/109951168665117523.jpg'
        },
    ],
    // 日推 - Live
    [
        {
            title: 'jiggy boogy (sped up)',
            author: 'Study Group',
            url: 'https://music.163.com/song/media/outer/url?id=2615267878.mp3',
            pic: 'https://p1.music.126.net/E3byOaUZwLP8MNtXfKgvuw==/109951169853517770.jpg'
        },
        {
            title: 'junkie',
            author: 'Study Group',
            url: 'https://music.163.com/song/media/outer/url?id=2607737920.mp3',
            pic: 'https://p1.music.126.net/4eYqE7mlVq_fxHihCmUM4g==/109951169778904902.jpg'
        },
        {
            title: 'Fallen Angel',// Done
            author: 'UnicornPhantom',
            url: 'https://music.163.com/song/media/outer/url?id=2071485908.mp3',
            pic: 'https://p2.music.126.net/RnkKxlngZH2A0KEphrBGnw==/109951168826312208.jpg'
        },
    ],
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
    default: "[WARN(歌单-选择-索引越界)] 未定义歌单名称"
    // 最后更新分类：2024/6/20
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

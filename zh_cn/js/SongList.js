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
];

// 从歌单列表中随机选择一个歌单
var randomPlaylistIndex = Math.floor(/* 四舍五入 */Math.random() * playlists.length);
// 关于随机，详见MDN: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/random
// 伪随机
var randomPlaylist = playlists[randomPlaylistIndex];

/* 日志记录 */
const playlistNames = {
    0: "小甜甜",
    1: "崩铁",
    2: "原神",
    3: "崩坏3",
    //4: "日推",
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

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const playlist = $('.playlist');
const cd = $('.cd');
const heading = $('header h2');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const playBtn = $('.btn-toggle-play');
const player = $('.player');
const progress = $('#progress');
const btnNext = $('.btn-next');
const btnPrev = $('.btn-prev');
const randomBtn = $('.btn-random');
const repeatBtn = $('.btn-repeat');

const progress_time_current = $('.progress_time--current');
const progress_time_duration = $('.progress_time--duration');


const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    songs: [
        {
            name: "đưa em về nhàa",
            singer: "GREY D, Chillies",
            path: "./assets/mp3/dua-em-ve-nhaa-GREY-D-Chillies.mp3",
            image: "./assets/img/duaemvenhaa.webp"
        },
        {
            name: "vai cau noi co khien nguoi thay doi",
            singer: "GREY D, tlinh",
            path: "./assets/mp3/vaicaunoicokhiennguoithaydoi-GREY-D-tlinh.mp3",
            image: "./assets/img/vaicaunoicokhiennguoithaydoi.webp"
        },
        {
            name: "Chúng ta của hiện tại",
            singer: "Sơn Tùng M-TP",
            path: "./assets/mp3/chungtacuahientai.m4a",
            image: "./assets/img/chungtacuahientai.jfif"
        },
        {
            name: "có hẹn với thanh xuân",
            singer: "MONSTAR",
            path: "./assets/mp3/co-hen-voi-thanh-xuan-MONSTAR.mp3",
            image: "./assets/img/cohenvoithanhxuan.webp"
        },
        {
            name: "Not A Fairy Tale",
            singer: "Orange, DTAP, Tizi Đích Lép",
            path: "./assets/mp3/Not-A-Fairy-Tale-Orange-DTAP-Tizi-Dich-Lep.mp3",
            image: "./assets/img/NotAFairyTale.webp"
        },
        {
            name: "Nơi Ta Chờ Em (Em Chưa 18 OST)",
            singer: "Will",
            path: "./assets/mp3/Noi-Ta-Cho-Em-Em-Chua-18-OST-Will.mp3",
            image: "./assets/img/noitachoem.webp"
        },
        {
            name: "Yêu Thương Ngày Đó (Yêu Em Bất Chấp OST)",
            singer: "SOOBIN",
            path: "./assets/mp3/Yeu-Thuong-Ngay-Do-Yeu-Em-Bat-Chap-OST-SOOBIN.mp3",
            image: "./assets/img/yeuthuongngaydo.webp"
        },
        {
            name: "Yêu Em Rất Nhiều",
            singer: "Hoàng Tôn",
            path: "./assets/mp3/Yeu-Em-Rat-Nhieu-Hoang-Ton.mp3",
            image: "./assets/img/yeuemratnhiu.webp"
        },
        {
            name: "Bật Tình Yêu Lên",
            singer: "Hòa Minzy ft. Tăng Duy Tân",
            path: "./assets/mp3/Bật Tình Yêu Lên - Hòa Minzy ft. Tăng Duy Tân「Cukak Remix」- Audio Lyrics Video.mp3",
            image: "./assets/img/BatTinhYeuLen.webp"
        },
        {
            name: "Nhất Trên Đời",
            singer: "VAnh, BMZ",
            path: "./assets/mp3/Nhat-Tren-Doi-Speed-Up-Version-VAnh-BMZ.mp3",
            image: "./assets/img/NhatTrenĐoi.webp"
        },
        {
            name: "Dối lừa",
            singer: "Nguyễn Đình Vũ",
            path: "./assets/mp3/Dối Lừa (Qinn Remix) Nguyễn Đình Vũ - Anh Đưa Tay Ra Để Cố Vuốt Ve Khuôn Mặt Em Thật Xinh Đẹp Remix.mp3",
            image: "./assets/img/doilua.webp"
        },
        {
            name: "[SERIES: Một Chút] 2017 thứ nhất.",
            singer: "cobeluoi",
            path: "./assets/mp3/[SERIES- Một Chút] 2017 thứ nhất..mp3",
            image: "./assets/img/list2.png"
        },
        {
            name: "Playlist này sẽ đưa bạn trở về 2019",
            singer: "p_ht.n",
            path: "./assets/mp3/Playlist này sẽ đưa bạn trở về 2019 - [ Playlist 2019 (1) ].mp3",
            image: "./assets/img/list1.png"
        },
        {
            name: "Giọng Ca Này Sẽ Làm Bạn Cảm Thấy Yêu Đời Hơn Mỗi Ngày",
            singer: "Saigon Chill Music",
            path: "./assets/mp3/y2meta.com - [1 Hour] Giọng Ca Này Sẽ Làm Bạn Cảm Thấy Yêu Đời Hơn Mỗi Ngày _ Mai Bích Trân (Cover) (128 kbps).mp3",
            image: "./assets/img/list3.png"
        }
    ],
    render: function () {
        const htmps = this.songs.map(song => {
            return `<div class="song">
            <div class="thumb" style="background-image: url('${song.image}')">
            </div>
            <div class="body">
              <h3 class="title">${song.name}</h3>
              <p class="author">${song.singer}</p>
            </div>
            <div class="option">
              <i class="fas fa-ellipsis-h"></i>
            </div>
          </div>`;
        })
        playlist.innerHTML = htmps.join('');
    },
    defineProperties: function () {
        Object.defineProperty(this, 'currentSong', {
            get: function () {
                return this.songs[this.currentIndex];
            }
        });
    },
    handelEvents: function () {

        // cd quay
        const cdThumbSAnimate = cdThumb.animate([
            { transform: 'rotate(360deg)' }
        ], {
            duration: 10000,
            iterations: Infinity
        });
        cdThumbSAnimate.pause();

        // phong to thu nho cd
        const cdWidth = cd.offsetWidth;
        document.onscroll = function () {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const newWidth = cdWidth - scrollTop;
            cd.style.width = `${newWidth > 0 ? newWidth : 0}px`;
            cd.style.opacity = newWidth / cdWidth;
        }
        // an bai hat:
        const listSong = $$('.song');
        listSong.forEach((element, index) => {
            element.onclick = function () {
                app.currentIndex = index;
                app.loadCurrentSong();
                audio.play();
                if (!app.isPlaying) {
                    app.isPlaying = true;
                    player.classList.add('playing');
                    cdThumbSAnimate.play();
                }
            }
        });
        // play
        playBtn.onclick = function () {
            if (app.isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }

            // play
            audio.onplay = function () {
                app.isPlaying = true;
                player.classList.add('playing');
                cdThumbSAnimate.play();
            }
            // pause
            audio.onpause = function () {
                player.classList.remove('playing');
                app.isPlaying = false;
                cdThumbSAnimate.pause();
            }
        }

        audio.ontimeupdate = function () {
            const duration = audio.duration;
            const currentTime = audio.currentTime;
            // hien thi thoi gian
            let minutes = Math.floor(currentTime / 60);
            let seconds = Math.floor(currentTime % 60);
            progress_time_current.textContent = minutes.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) + ":" + seconds.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
            if (audio.duration) {
                minutes = Math.floor(duration / 60);
                seconds = Math.floor(duration % 60);
                progress_time_duration.textContent = minutes.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) + ":" + seconds.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });

                const percent = Math.floor((currentTime / duration) * 100);
                progress.value = percent;
                // chuyen bai
                if (percent === 100) {
                    if (app.isRepeat) {
                        audio.currentTime = 0;
                        progress.value = 0;
                        audio.play();
                    } else if (app.isRandom) {
                        app.playRadomSong();
                        audio.play();
                        if (!app.isPlaying) {
                            app.isPlaying = true;
                            player.classList.add('playing');
                            cdThumbSAnimate.play();
                        }
                    } else {
                        audio.currentTime = 0;
                        progress.value = 0;
                        player.classList.remove('playing');
                        app.isPlaying = false;
                        cdThumbSAnimate.pause();
                    }
                }
            }
        }
        //tua
        progress.onchange = function (e) {
            const duration = audio.duration;
            const percent = e.target.value;
            const seekTime = Math.floor((duration / 100) * percent);
            audio.currentTime = seekTime;
        }
        // khi next bai
        btnNext.onclick = function () {
            app.nextSong();
            audio.play();
            if (!app.isPlaying) {
                app.isPlaying = true;
                player.classList.add('playing');
                cdThumbSAnimate.play();
            }
        }
        // quay lai 
        btnPrev.onclick = function () {
            app.PrevSong();
            audio.play();
            if (!app.isPlaying) {
                app.isPlaying = true;
                player.classList.add('playing');
                cdThumbSAnimate.play();
            }
        }
        // random
        randomBtn.onclick = function () {
            app.isRandom = !app.isRandom;
            randomBtn.classList.toggle('active', this.isRandom);
        }
        //repeat
        repeatBtn.onclick = function () {
            app.isRepeat = !app.isRepeat;
            repeatBtn.classList.toggle('active', this.isRepeat);
        }
    },
    loadCurrentSong: function () {
        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
        document.title = this.currentSong.name;
        audio.src = this.currentSong.path;
    },
    nextSong: function () {
        this.currentIndex++;
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
    },
    PrevSong: function () {
        this.currentIndex--;
        if (this.currentIndex <= 0) {
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong();
    },
    playRadomSong: function () {
        let index_old = this.currentIndex;
        do {
            this.currentIndex = Math.floor(Math.random() * this.songs.length);
        } while (this.currentIndex == index_old);

        this.loadCurrentSong();
    },
    start: function () {
        this.defineProperties(); //  định nghĩa các thuộc tính
        this.render();
        this.handelEvents(); //  lắng nghe sự kiện
        this.loadCurrentSong(); // Tai thong tin bai hat dau tien
    }
};

app.start();

# KatsuNao

爆豪勝己 × 小森尚｜非官方夢向網站

- 網站：<https://boublelinaw.github.io/katsunao.github.io/>
- 後台：<https://app.pagescms.org>（只有 repo 擁有者能編輯）
- 操作說明：[docs/後台操作說明.md](docs/後台操作說明.md)

## 檔案結構

| 位置 | 內容 |
|---|---|
| `_data/settings.yml` | 網站設定（書封、計時器、音樂、字體…） |
| `_data/home.yml` | 世界觀、入內須知 |
| `_data/toc.yml` | 目錄 |
| `_data/pages/` | 各個頁面（由區塊組成） |
| `_data/creations/` | 創作 |
| `_data/categories/`、`_data/tags/` | 創作分類、標籤 |
| `assets/uploads/` | 後台上傳的圖片與音檔 |
| `.pages.yml` | 後台欄位設定 |
| `index.html`、`assets/` | 網站外觀與動畫 |

網站由 GitHub Pages 內建的 Jekyll 把 `_data/` 的內容輸出成 `data.json`，再由網頁讀取並顯示。

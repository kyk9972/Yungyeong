/* Additive print companions: never toggle the user's cards or carousel state. */
(() => {
  const website = 'https://kyk9972.github.io/Yungyeong/ai/';
  const root = new URL('../', website);
  const source = document.createElement('p');
  source.className = 'pdf-only pdf-source';
  const original = document.createElement('a');
  original.href = website;
  original.textContent = `원본 웹 포트폴리오 ↗ ${website}`;
  source.append(original);
  document.querySelector('.hero-inner').append(source);

  const localPosters = {
    'junggwajang.mp4': 'junggwajang.jpg',
    'ladyboss.mp4': 'ladyboss.jpg',
    'shot-01.mp4': 'shot-01.jpg',
    'office-image-to-video.mp4': 'office-image-to-video.jpg',
    'montage.mp4': 'montage.jpg'
  };
  const youtubePosters = { ze0q5ixDj_0: 'byeoljong.jpg', T5T1x9yysBs: 'webtoon.jpg' };
  document.querySelectorAll('video, iframe[src*="youtube.com/embed/"]').forEach(media => {
    const raw = media.getAttribute('src') || media.querySelector('source')?.getAttribute('src');
    if (!raw) return;
    let url = new URL(raw, root);
    const youtube = url.hostname.endsWith('youtube.com') && url.pathname.startsWith('/embed/');
    const key = url.pathname.split('/').pop();
    const poster = youtube ? youtubePosters[key] : localPosters[key];
    if (youtube) url = new URL(`https://www.youtube.com/watch?v=${key}`);
    const link = document.createElement('a');
    link.className = 'pdf-only pdf-video';
    link.href = url.href;
    link.target = '_blank';
    link.rel = 'noopener';
    const image = document.createElement('img');
    image.src = poster ? `ai/pdf-assets/${poster}` : media.poster;
    image.alt = media.title || media.closest('figure')?.querySelector('figcaption strong')?.textContent || '영상 대표 장면';
    const caption = document.createElement('span');
    caption.textContent = '▶ 원본 영상 보기 · 클릭하면 브라우저에서 열립니다';
    link.append(image, caption);
    media.after(link);
  });
  // The only screen addition; download works without a print dialog or popup.
  const download = document.createElement('a');
  download.className = 'pdf-download';
  download.href = 'ai/kim-yungyeong-portfolio.pdf';
  download.download = '김윤경_포트폴리오.pdf';
  download.textContent = 'PDF 다운로드';
  download.setAttribute('aria-label', '전체 상세 내용을 포함한 PDF 포트폴리오 다운로드');
  document.body.append(download);
})();

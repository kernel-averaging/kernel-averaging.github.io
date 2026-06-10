(() => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const frames = [
    { src: 'img/frames/student_specialist_01.png', label: '1 teacher', alt: 'Student kernel heatmap for 1 teacher.' },
    { src: 'img/frames/student_specialist_02.png', label: '2 teachers', alt: 'Student kernel heatmap for 2 teachers.' },
    { src: 'img/frames/student_specialist_03.png', label: '3 teachers', alt: 'Student kernel heatmap for 3 teachers.' },
    { src: 'img/frames/student_specialist_04.png', label: '4 teachers', alt: 'Student kernel heatmap for 4 teachers.' },
    { src: 'img/frames/student_specialist_05.png', label: '5 teachers', alt: 'Student kernel heatmap for 5 teachers.' },
    { src: 'img/frames/student_specialist_06.png', label: '6 teachers', alt: 'Student kernel heatmap for 6 teachers.' },
    { src: 'img/frames/student_specialist_07.png', label: '7 teachers', alt: 'Student kernel heatmap for 7 teachers.' },
    { src: 'img/frames/student_specialist_08.png', label: '8 teachers', alt: 'Student kernel heatmap for 8 teachers.' },
    { src: 'img/frames/student_specialist_09.png', label: '9 teachers', alt: 'Student kernel heatmap for 9 teachers.' },
    { src: 'img/frames/student_specialist_10.png', label: 'Oracle kernel', alt: 'Oracle kernel heatmap from the same progression strip.' }
  ];

  const viewer = document.querySelector('[data-viewer]');
  if (viewer) {
    const image = viewer.querySelector('#kernel-frame');
    const label = viewer.querySelector('#frame-label');
    const slider = viewer.querySelector('#frame-slider');
    const previous = viewer.querySelector('[data-action="prev"]');
    const next = viewer.querySelector('[data-action="next"]');
    const play = viewer.querySelector('[data-action="play"]');
    let index = 0;
    let timer = null;

    frames.forEach((frame) => {
      const preload = new Image();
      preload.src = frame.src;
    });

    const setFrame = (nextIndex) => {
      index = (nextIndex + frames.length) % frames.length;
      const frame = frames[index];
      image.src = frame.src;
      image.alt = frame.alt;
      label.textContent = frame.label;
      slider.value = String(index);
      slider.setAttribute('aria-valuetext', frame.label);
    };

    const stop = () => {
      if (timer) window.clearInterval(timer);
      timer = null;
      play.textContent = 'Play';
    };

    const start = () => {
      if (prefersReducedMotion) return;
      if (timer) window.clearInterval(timer);
      timer = window.setInterval(() => setFrame(index + 1), 1300);
      play.textContent = 'Pause';
    };

    slider.addEventListener('input', (event) => {
      stop();
      setFrame(Number(event.target.value));
    });

    previous.addEventListener('click', () => {
      stop();
      setFrame(index - 1);
    });

    next.addEventListener('click', () => {
      stop();
      setFrame(index + 1);
    });

    play.addEventListener('click', () => {
      if (timer) stop(); else start();
    });
  }

  const figures = {
    'simplices': {
      src: 'img/figures/simplices_overview.png',
      alt: 'Simplex landscapes showing oracle similarity for convex weighted averages of kernels.',
      caption: 'Simplex landscapes: each triangle interpolates among three teacher kernels. High-similarity regions often lie near the barycenter, supporting plain averaging as a natural operation.'
    },
    'data-splits': {
      src: 'img/figures/data_splits.png',
      alt: 'CIFAR10 specialist data splits showing skewed class distributions and example images.',
      caption: 'Specialist data splits: skewed class distributions create distribution shift for specialist-teacher evaluation.'
    },
    'multiarch-trends': {
      src: 'img/figures/multiarch_trends_kernels.png',
      alt: 'Kernel averaging trends for different network architectures.',
      caption: 'Multi-architecture trends: kernels are averaged across different architectures on ImageNet-100 and compared to an oracle architecture.'
    },
    'multitask': {
      src: 'img/figures/multitask_multiarch_kernel_ensemble_average.png',
      alt: 'Mixed-task kernel averaging result for multiple pretrained models and an oracle.',
      caption: 'Mixed-task averaging: the paper averages models trained with different objectives, including MAE, CLIP, ImageNet classification, DeiT distillation, DINOv2, and FCMAE-style pretraining.'
    },
    'multiarch-landscape': {
      src: 'img/figures/multiarch_sim_landscape.png',
      alt: 'Simplex landscapes for kernels from different architectures.',
      caption: 'Architecture landscapes: the simplex experiment is repeated with kernels from different model architectures.'
    },
    'multiarch-controlled': {
      src: 'img/figures/multiarch_acc_controlled.png',
      alt: 'Accuracy-controlled simplex landscapes for multi-architecture kernel averaging.',
      caption: 'Accuracy-controlled architectures: each architecture is trained to the same accuracy on different ImageNet-100 splits before evaluating the landscape.'
    },
    'kernel-strip': {
      src: 'img/figures/10_kernels_avg_imagenet_strip.png',
      alt: 'ImageNet-100 strip showing kernel progression as more specialist teachers are averaged.',
      caption: 'ImageNet-100 kernel strip: the source panel used to crop the interactive frames above.'
    }
  };

  const select = document.querySelector('#figure-select');
  const browserImage = document.querySelector('#browser-image');
  const browserCaption = document.querySelector('#browser-caption');

  if (select && browserImage && browserCaption) {
    Object.values(figures).forEach((figure) => {
      const preload = new Image();
      preload.src = figure.src;
    });

    select.addEventListener('change', () => {
      const figure = figures[select.value];
      if (!figure) return;
      browserImage.src = figure.src;
      browserImage.alt = figure.alt;
      browserCaption.textContent = figure.caption;
    });
  }
})();

const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const PREVIEW_SIZE = 70;
const DEFAULT_AVATAR_SRC = 'img/muffin-grey.svg';
const DEFAULT_PHOTO_SRC = 'img/no-image.svg';

const avatarUploader = document.querySelector('.ad-form__field input[type=file]');
const avatarPreview = document.querySelector('.ad-form-header__preview img');

const photoContainer = document.querySelector('.ad-form__photo');
const photoUploader = document.querySelector('.ad-form__upload input[type=file]');
const photoPreview = document.createElement('img');

const setPreviewFiles = (selectedFile, preview) => {
  return (evt) => {
    evt.preventDefault();
    const file = selectedFile.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((fileType) => {
      return fileName.endsWith(fileType);
    });
    if (matches) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        preview.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  };
};

const initPhotoUploaders = () => {
  avatarUploader.addEventListener('change', setPreviewFiles(avatarUploader, avatarPreview));
  photoUploader.addEventListener('change', setPreviewFiles(photoUploader, photoPreview));
  photoPreview.width = PREVIEW_SIZE;
  photoPreview.height = PREVIEW_SIZE;
  photoContainer.append(photoPreview);
};

const resetPreview = () => {
  avatarPreview.src = DEFAULT_AVATAR_SRC;
  photoPreview.src = DEFAULT_PHOTO_SRC;
};

export { initPhotoUploaders, resetPreview };

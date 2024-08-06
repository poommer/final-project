<script>
  let file;

  async function upload() {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/uploads', {
          method: 'POST',
          body: formData
      });

      if (response.ok) {
          alert('File uploaded successfully');
      } else {
          alert('Failed to upload file');
      }
  }
</script>

<form action="?/upload" method="POST" enctype="multipart/form-data">
  <input type="password" name="a" id="">
  <input type="file" name="fileUpload" bind:this={file} />
  <button>Upload</button>
</form>

<template>
  <div class="page main-div">
    <Content
      :key="$page.path"
      class="page-content"
    />
  </div>
</template>

<script>
export default {
  name: 'Layout',
}
</script>


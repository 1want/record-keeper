<template>
  <router-view />
</template>

<script setup lang="ts"></script>

<style>
body {
  overflow: hidden;
}

/* 让 dialog 垂直水平居中 */
.el-overlay-dialog {
  display: flex !important;
  align-items: center;
  justify-content: center;
}

.el-dialog {
  margin: 0 !important;
  display: flex !important;
  flex-direction: column;
  max-height: 90vh;
  max-width: 90vw;
}

.el-dialog .el-dialog__body {
  height: 550px;
  overflow-y: auto;
  flex: 1;
}
</style>

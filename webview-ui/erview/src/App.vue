
<template>
	<el-config-provider namespace="ep">
		<ErView :er-list="erList" :jdl-filename="jdlFilename" />
	</el-config-provider>
</template>
<script lang="ts" setup>
import ErView from './views/dber.vue';
const erList = (window as any).erList;
const jdlFilename = (window as any).jdlFilename;
</script>
  
<style>
#app {
	text-align: center;
	color: var(--ep-text-color-primary);
}

.main-container {
	height: calc(100vh - var(--ep-menu-item-height) - 3px);
}
</style>
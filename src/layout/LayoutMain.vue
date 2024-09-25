<template>
	<div class="layout">
		<slot></slot>
	</div>
</template>

<style scoped>
.layout {
	position: relative;
	display: flex;
	flex-flow: column;
	gap: 20px;
}
</style>

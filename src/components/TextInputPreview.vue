<script setup lang="ts">
import { nextTick, PropType, ref, useTemplateRef } from "vue"
import IconEdit from "@/assets/icon-edit.vue"
import IconCheck from "@/assets/icon-check.vue"

const modelText = defineModel<string>()
const props = defineProps({
	tag: {
		type: String as PropType<"h1" | "p">,
		required: false,
		default: "p",
	},
})

const isEditing = ref(false)
const textarea = useTemplateRef("textareaRef")

const enterEditing = async () => {
	isEditing.value = true
	await nextTick()
	textarea.value?.focus()
}
const exitEditing = () => {
	isEditing.value = false
}
</script>

<template>
	<div class="wrapper" v-if="!isEditing">
		<h1
			v-if="props.tag === 'h1'"
			:class="$attrs.class"
			@click="enterEditing"
		>
			<IconEdit class="icon edit" />{{ modelText }}
		</h1>
		<p v-if="props.tag === 'p'" :class="$attrs.class" @click="enterEditing">
			<IconEdit class="icon edit small" />{{ modelText }}
		</p>
	</div>
	<div class="wrapper" v-if="isEditing">
		<textarea
			v-model="modelText"
			v-bind:class="$attrs.class"
			:class="{ small: props.tag === 'p' }"
			ref="textareaRef"
			@focusout="exitEditing"
		></textarea>
		<IconCheck class="icon save" :class="{ small: props.tag === 'p' }" />
	</div>
</template>

<style scoped>
.wrapper {
	position: relative;
	width: 100%;
}
h1,
p {
	position: relative;
	padding: 8px;
	margin: 0;
	border: 2px solid transparent;
	border-radius: 10px;
	white-space: pre-wrap;
	transition: border-color 0.2s ease-in-out;
	box-sizing: border-box;
	cursor: text;
}
p {
	border-radius: 8px;
}
.icon.edit {
	position: absolute;
	right: 8px;
	top: 8px;
	width: 40px;
	height: 40px;
	fill: rgb(0 189 113 / 0%);
	transition: fill 0.1s ease-in-out;
}
.icon.edit.small {
	width: 20px;
	height: 20px;
}
/* Hack for empty text */
h1:after,
p:after {
	content: "";
	display: inline-block;
	width: 0px;
}
h1:hover,
p:hover {
	border: 2px solid rgb(0 189 113 / 40%);
}
h1:hover .icon,
p:hover .icon {
	fill: rgb(0 189 113 / 80%);
}
.bigTitle {
	text-align: left;
	text-indent: 50px;
}
textarea {
	display: block;
	flex-grow: 1;
	width: 100%;
	padding: 8px;
	margin: 0;
	border: 2px solid rgb(0 189 113 / 80%);
	border-radius: 10px;
	font-family: inherit;
	outline: none;
	resize: none;
	field-sizing: content;
	box-shadow: rgb(0 189 113 / 10%) 0 0 40px 0;
	box-sizing: border-box;
}
textarea.small {
	border-radius: 8px;
}
.icon.save {
	position: absolute;
	top: 8px;
	right: -44px;
	width: 40px;
	height: 40px;
	fill: rgb(0 189 113 / 80%);
}
.icon.save.small {
	bottom: unset;
	top: 10px;
	right: -25px;
	width: 20px;
	height: 20px;
}
</style>

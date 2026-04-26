<template>
  <el-dialog
    :model-value="dialog"
    @update:model-value="val => emit('update:dialog', val)"
    :title="type === 'add' ? '新增' : '编辑'"
    width="600"
    draggable
  >
    <el-form ref="formRef" :inline="true" :model="localForm" label-width="80px" :rules="rules">
      <el-form-item label="用户昵称" prop="nickName">
        <el-input v-model="localForm.nickName" />
      </el-form-item>
      <el-form-item label="手机号码" prop="phone">
        <el-input v-model="localForm.phone" maxlength="11" />
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="localForm.email" />
      </el-form-item>
      <el-form-item label="用户性别">
        <el-select v-model="localForm.sex" placeholder="请选择性别">
          <el-option label="男" value="1" />
          <el-option label="女" value="0" />
        </el-select>
      </el-form-item>
      <el-form-item label="用户角色" prop="roleId">
        <el-select v-model="localForm.roleId" placeholder="请选择角色">
          <el-option v-for="item in roleOptions" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确认</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { addUser, updateUser } from '@/api'
import { getRoleList } from '@/api/system-management/role'
import type { FormInstance } from 'element-plus'

const props = defineProps(['dialog', 'form', 'type'])
const emit = defineEmits(['update:dialog', 'refresh'])
const formRef = ref<FormInstance>()
const roleOptions = ref<any[]>([])

onMounted(async () => {
  try {
    const res: any = await getRoleList()
    roleOptions.value = res.data
  } catch (error) {
    console.error(error)
  }
})

const rules = {
  nickName: [{ required: true, message: '请输入用户昵称', trigger: 'blur' }],
  phone: [
    { required: true, message: '请输入手机号码', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }
  ],
  email: [{ type: 'email' as const, message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }]
}

const localForm = ref({ ...props.form })

const handleCancel = () => {
  emit('update:dialog', false)
}

const handleConfirm = async () => {
  const isValid = await formRef.value?.validate().catch(() => false)
  if (!isValid) return
    
  const request = props.type === 'add' ? addUser(localForm.value) : updateUser(localForm.value)
  const res = await request

  ElMessage.success(res.message)
  emit('update:dialog', false)
  emit('refresh')
}
</script>

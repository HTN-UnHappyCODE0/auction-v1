<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RouterLink, useRouter } from "vue-router";
import { ref } from "vue";
import { useAuthStore } from "@/stores/authStore";

type PAYLOAD = { email: string; password: string };
const form = ref<PAYLOAD>({ email: "admin@admin.com", password: "htdass" });
const router = useRouter();
const authStore = useAuthStore();
const onSubmit = async () => {
  try {
    await authStore.registerUser(form.value);
    router.push("/");
  } catch (error) {
    console.error(error);
  } finally {
    form.value = { email: "", password: "" };
  }
};
</script>

<template>
  <div class="flex justify-center items-center min-h-screen">
    <div class="mx-auto w-full max-w-md">
      <form @submit.prevent="onSubmit">
        <Card class="overflow-y-auto">
          <CardHeader class="space-y-1">
            <CardTitle class="text-2xl font-semibold"
              >Register account</CardTitle
            >
            <CardDescription>Register your account.</CardDescription>
          </CardHeader>
          <CardContent class="grid gap-4">
            <div class="grid gap-2">
              <Label for="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="email"
                v-model="form.email"
              />
            </div>
            <div class="grid gap-2">
              <Label for="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="password"
                v-model="form.password"
              />
            </div>
          </CardContent>
          <CardFooter class="flex-col space-y-2">
            <Button class="w-full" type="submit"> Register </Button>
            <p>
              Have account ?
              <RouterLink
                to="/auth/login"
                class="border-b border-gray-500 text-muted-foreground hover:text-primary"
                >Login</RouterLink
              >
            </p>
          </CardFooter>
        </Card>
      </form>
    </div>
  </div>
</template>

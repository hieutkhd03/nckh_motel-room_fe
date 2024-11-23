<template>
  <div id="app">
    <!-- Header -->
    <AdminHeaderComponent />
    <UserHeaderComponent />

    <!-- Account -->
    <AccountCreateComponent />
    <AccountEditComponent />

    <!-- Customer -->
    <CustomerCreateComponent />
    <CustomerEditComponent />

    <!-- Drop-down Menu -->
    <LogoutComponent />
    <PostHistoryComponent />
    <RechargeComponent />
    <RechargeHistoryComponent />
    <UserInfoComponent />

    <!-- Post -->
    <PostCreateComponent />
    <PostEditComponent />

    <!-- Recharge -->
    <RechargeCreateComponent />
    <RechargeEditComponent />

    <!-- Admin Menu -->
    <AdminMenuComponent />

    <!-- Admin Page -->
    <AdminPageComponent />

    <!-- Contact -->
    <ContactComponent />

    <!-- Detail View -->
    <DetailViewComponent />

    <!-- Footer -->
    <FooterComponent />

    <!-- Login -->
    <LoginComponent />

    <!-- New Post -->
    <NewPostComponent />

    <!-- Print -->
    <PrintComponent />

    <!-- Register -->
    <RegisterComponent />

    <!-- Report -->
    <ReportComponent />

    <!-- Search -->
    <SearchComponent />

    <!-- User Page -->
    <UserPageComponent />
  </div>
</template>

<script>
import AdminHeaderComponent from "./components/header/AdminHeaderComponent.vue";
import UserHeaderComponent from "./components/header/UserHeaderComponent.vue";

import AccountCreateComponent from "./components/account/AccountCreateComponent.vue";
import AccountEditComponent from "./components/account/AccountEditComponent.vue";

import CustomerCreateComponent from "./components/customer/CustomerCreateComponent.vue";
import CustomerEditComponent from "./components/customer/CustomerEditComponent.vue";

import LogoutComponent from "./components/drop-down_menu/LogoutComponent.vue";
import PostHistoryComponent from "./components/drop-down_menu/PostHistoryComponent.vue";
import RechargeComponent from "./components/drop-down_menu/RechargeComponent.vue";
import RechargeHistoryComponent from "./components/drop-down_menu/RechargeHistoryComponent.vue";
import UserInfoComponent from "./components/drop-down_menu/UserInfoComponent.vue";

import PostCreateComponent from "./components/post/PostCreateComponent.vue";
import PostEditComponent from "./components/post/PostEditComponent.vue";

import RechargeCreateComponent from "./components/recharge/RechargeCreateComponent.vue";
import RechargeEditComponent from "./components/recharge/RechargeEditComponent.vue";

import AdminMenuComponent from "./components/AdminMenuComponent.vue";
import AdminPageComponent from "./components/AdminPageComponent.vue";
import ContactComponent from "./components/ContactComponent.vue";
import DetailViewComponent from "./components/DetailViewComponent.vue";
import FooterComponent from "./components/FooterComponent.vue";
import LoginComponent from "./components/LoginComponent.vue";
import NewPostComponent from "./components/NewPostComponent.vue";
import PrintComponent from "./components/PrintComponent.vue";
import RegisterComponent from "./components/RegisterComponent.vue";
import ReportComponent from "./components/ReportComponent.vue";
import SearchComponent from "./components/SearchComponent.vue";
import UserPageComponent from "./components/UserPageComponent.vue";

export default {
  components: {
    AdminHeaderComponent,
    UserHeaderComponent,
    AccountCreateComponent,
    AccountEditComponent,
    CustomerCreateComponent,
    CustomerEditComponent,
    LogoutComponent,
    PostHistoryComponent,
    RechargeComponent,
    RechargeHistoryComponent,
    UserInfoComponent,
    PostCreateComponent,
    PostEditComponent,
    RechargeCreateComponent,
    RechargeEditComponent,
    AdminMenuComponent,
    AdminPageComponent,
    ContactComponent,
    DetailViewComponent,
    FooterComponent,
    LoginComponent,
    NewPostComponent,
    PrintComponent,
    RegisterComponent,
    ReportComponent,
    SearchComponent,
    UserPageComponent,
  },
};
</script>

<style></style>

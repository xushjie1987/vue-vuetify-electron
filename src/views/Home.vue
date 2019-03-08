<template>
  <v-app id="sandbox" :dark="skin.dark">
    <v-navigation-drawer
      v-model="skin.primaryDrawer.model"
      :permanent="skin.primaryDrawer.type === 'permanent'"
      :temporary="skin.primaryDrawer.type === 'temporary'"
      :clipped="skin.primaryDrawer.clipped"
      :floating="skin.primaryDrawer.floating"
      :mini-variant="skin.primaryDrawer.mini"
      absolute
      overflow
      app
    >
      <!-- 抽屉内容start -->
      <v-container fluid>
        <v-layout align-center justify-center>
          <v-expansion-panel popout>
            <!-- 第一个card -->
            <v-expansion-panel-content>
              <template v-slot:header>
                <div>菜单</div>
              </template>
              <v-card>
                <v-card-text>
                  <v-list two-line>
                    <template v-for="(item, index) in allPage">
                      <v-list-tile :key="item.title" avatar ripple :to="item.path">
                        <v-list-tile-content>
                          <v-list-tile-sub-title class="text--primary">{{ item.name }}</v-list-tile-sub-title>
                        </v-list-tile-content>
                      </v-list-tile>
                      <v-divider v-if="index + 1 < allPage.length" :key="index"></v-divider>
                    </template>
                  </v-list>
                </v-card-text>
              </v-card>
            </v-expansion-panel-content>

            <!-- 第二个card -->
            <v-expansion-panel-content>
              <template v-slot:header>
                <div>皮肤</div>
              </template>
              <v-card>
                <v-card-text>
                  <v-layout row wrap>
                    <v-flex xs12 md6>
                      <span>Scheme</span>
                      <v-switch v-model="skin.dark" primary label="Dark"></v-switch>

                      <span>Drawer</span>
                      <v-radio-group v-model="skin.primaryDrawer.type" column>
                        <v-radio
                          v-for="drawer in skin.drawers"
                          :key="drawer"
                          :label="drawer"
                          :value="drawer.toLowerCase()"
                          primary
                        ></v-radio>
                      </v-radio-group>
                      <v-switch v-model="skin.primaryDrawer.clipped" label="Clipped" primary></v-switch>
                      <v-switch v-model="skin.primaryDrawer.floating" label="Floating" primary></v-switch>
                      <v-switch v-model="skin.primaryDrawer.mini" label="Mini" primary></v-switch>
                      <span>skin.Footer</span>
                      <v-switch v-model="skin.footer.inset" label="Inset" primary></v-switch>
                    </v-flex>
                  </v-layout>
                </v-card-text>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-layout>
      </v-container>
      <!-- 抽屉内容end -->
    </v-navigation-drawer>

    <v-toolbar :clipped-left="skin.primaryDrawer.clipped" app absolute>
      <v-toolbar-side-icon
        v-if="skin.primaryDrawer.type !== 'permanent'"
        @click.stop="skin.primaryDrawer.model = !skin.primaryDrawer.model"
      ></v-toolbar-side-icon>
      <v-toolbar-title>xxxx</v-toolbar-title>

      <template v-slot:extension>
        <v-tabs color="transparent" slider-color="red" show-arrows fixed-tabs>
          <!-- 显示tabs start -->
          <v-tab
            v-for="item in tabItems"
            :key="item"
            :to="item.path"
            @contextmenu.prevent="removeItem(item)"
          >{{ item.name }}</v-tab>

          <!-- 显示tabs end -->
        </v-tabs>
      </template>
    </v-toolbar>

    <v-content>
      <v-container fluid>
        <keep-alive>
          <transition
            name="fade"
            enter-active-class="animated bounceInRight"
            leave-active-class="animated hinge"
            :duration="200"
          >
            <router-view/>
          </transition>
        </keep-alive>
      </v-container>
    </v-content>

    <v-footer :inset="skin.footer.inset" app>
      <span class="px-3">&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  /**
  定义变量
   */
  data: () => ({
    //皮肤配置
    skin: {
      //暗黑主题开关
      dark: false,
      //抽屉三个模式
      drawers: ["Default (no property)", "Permanent", "Temporary"],
      //左侧抽屉 配置
      primaryDrawer: {
        model: false,
        type: "default (no property)",
        clipped: false,
        floating: false,
        mini: false
      },
      //底部配置
      footer: {
        inset: false
      }
    },

    //左侧所有导航
    allPage: [],
    //tabs
    tabItems: []
  }),

  /**
  方法
   */
  methods: {
    /** 右键删除tab */
    removeItem(clickItem) {
      var path = "/"; //默认 首页

      //禁止关闭首页
      if (clickItem.path == path) {
        return;
      }
      var index = -1;
      //寻找 对应的下标
      for (var i = 0; i < this.tabItems.length; i++) {
        if (this.tabItems[i].name == clickItem.name) {
          index = i;
          break;
        }
      }
      //找到下标则删除
      if (index > -1) {
        //删除(开始位置,数量)
        this.tabItems.splice(index, 1);
        //改变当前页面
        if (this.tabItems[index]) {
          path = this.tabItems[index].path;
        } else if (this.tabItems[index - 1]) {
          path = this.tabItems[index - 1].path;
        }
        //跳转页面
        this.$router.push(path);
      }
    },

    /** 获取所有的页面名称和地址 */
    getAllPage() {
      //所有路由信息
      var routes = this.$router.options.routes;
      for (let item of routes) {
        //是否存在子页面
        if (item.children.length > 0) {
          for (let children of item.children) {
            this.allPage.push({ name: children.name, path: children.path });
          }
        } else {
          this.allPage.push({ name: item.name, path: item.path });
        }
      }
    }
  },

  /** 
  页面渲染成功后触发
   */
  mounted: function() {
    this.getAllPage();
  },

  /**
  监测变量
   */
  watch: {
    //路由改变 添加 tab
    $route(to, from) {
      //判断是否存在
      var isExist = this.tabItems.some((item, index) => {
        return item.name == to.name && item.path == to.path;
      });
      if (!isExist) {
        this.tabItems.push({ name: to.name, path: to.path });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
</style>


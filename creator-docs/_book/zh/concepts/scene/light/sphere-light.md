# 球面光

Cocos Creator 3.0 中使用球面光替代 **点光源（Point Light）**，因为点光源是忽略体积的，但是真实世界中的物理光源都具有光源大小属性。

![sphere light](sphere-light.jpg)

在场景中添加球面光的方式可参考 [光照](../light.md)。

球面光组件接口请参考 [SphereLight API](https://docs.cocos.com/creator/3.0/api/zh/classes/component_light.spherelight.html)。

## 球面光属性

![image](sphere-light-prop.png)

| 属性 | 说明 |
| :---- | :---- |
| Color | 设置光源颜色 |
| UseColorTemperature | 是否启用色温 |
| ColorTemperature | 调节色温 |
| Size | 设置光源大小 |
| Range | 设置光照影响范围 |
| Term | 设置光照强度单位类型，包括 **发光功率（LUMINOUS_POWER）** 和 **亮度（LUMINANCE）** 两种 |
| LuminousPower | 发光功率，单位 **流明（lm）**<br>当 **Term** 设置为 **LUMINOUS_POWER** 时生效 |
| Luminance | 亮度，单位 **坎德拉每平方米（cd/m<sup>2</sup>）**<br>当 **Term** 设置为 **LUMINANCE** 时生效 |
| StaticSettings | 静态灯光设置，详情请参考 [烘焙系统](../../../editor/lightmap/index.md) |

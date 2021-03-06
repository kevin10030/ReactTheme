# 聚光灯

**聚光灯** 是由一个点向一个方向发射一束光线，接近于手电筒产生的光线。聚光灯比其他类型的光源多了 `SpotAngle` 属性，用于调整聚光灯的光照范围。

![spotlight](spot-light.jpg)

在场景中添加聚光灯的方式可参考 [光照](../light.md)。

聚光灯组件接口请参考 [SpotLight API](https://docs.cocos.com/creator/3.0/api/zh/classes/component_light.spotlight.html)。

## 聚光灯属性

![image](spot-light-prop.png)

| 属性 | 说明 |
| :------ | :--- |
| Color | 设置光源颜色 |
| UseColorTemperature | 是否启用色温 |
| ColorTemperature | 调节色温 |
| Size | 设置光源大小 |
| Range | 设置光照影响范围 |
| SpotAngle | 调整聚光角度，控制光照范围 |
| Term | 设置光照强度单位类型，包括 **发光功率（LUMINOUS_POWER）** 和 **亮度（LUMINANCE）** 两种  |
| LuminousPower | 发光功率，单位 **流明（lm）**<br>当 **Term** 设置为 **LUMINOUS_POWER** 时生效  |
| Luminance | 亮度，单位 **坎德拉每平方米（cd/m<sup>2</sup>）**<br>当 **Term** 设置为 **LUMINANCE** 时生效 |
| StaticSettings | 静态灯光设置，详情请参考 [烘焙系统](../../../editor/lightmap/index.md) |

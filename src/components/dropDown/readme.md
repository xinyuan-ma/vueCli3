# dropDown 下拉组件

### template
```  js
import DropDown from 'components/dropDown';
```
``` html
<drop-down></drop-down>
```

### props
| props    | 类型     | 必传    | 描述    |
| -----    | -----   | -----   | -----  |
|dropType  | String  | N       | 下拉方式 默认下拉无文案，fixed: 固定到wrapper元素，不随container移动;follow: 跟随container移动 |
|duration  | Number  | N       | 回弹时间, 默认 300，单位：ms |
|container | String  | N       | 滚动容器className |
|dropMax   | Number  | N       | 最大拉动距离, 默认 100，单位：px |
|damping   | Number  | N       | 阻尼系数 ，0~1 范围内，阻尼越大，下拉越快，大于1时，阻尼越大，下拉受到的阻力越大，拉动越慢   |
|autoBack  | Boolean | N       | 是否开启自动回弹，默认： true   |
|canDrop   | Boolean | N       | 是否可以下拉       |
|dropStart | Function| N       | 开始下拉 回调      |
|dropMove  | Function| N       | 下拉过程中 回调 param: progress 进度 0~1   |
|dropEnd   | Function| N       | 下拉达到峰值回调    |
|dropUpStart|Function| N       | 开始回弹 回调      |
|dropUpEnd | Function| N       | 回弹结束回调       |

### slot

#### default
下拉内容容器

#### drop-down-fixed
下拉时该容器固定在下拉组件顶部，组件下拉时出现，不随下拉移动而移动。
该slot 只当`dropType`为 `fixed` 时有效。

#### drop-down-follow
下拉时该容器跟随下拉容器移动。
该slot 只当 `dropType` 为 `follow` 时有效。

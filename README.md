# Vue js 공부내용 정리



```
{{ }}
```

머스태쉬는 템플릿이다.

```
v-bind: 의 축약형은 : 이다. 
```



```
v-on:click 의 축약형은 @ 이다.
```



computed 안에 넣으면 결과 값을 캐싱해두고, method안에 있으면 계속 재계산한다.



v-if 와 v-show의 큰 차이점은 v-show는 false 임에도 DOM에 남게 된다. 또한 \<template> 구문을 지원하지 않고 else 도 없음. 

자주 바뀐다면 v-show를 아니라면 v-if 를



Vue는 이미 만들어진 인스턴스에 새로운 루트레벨의 반응형 속성을 동적으로 추가하는 것을 허용하지 않습니다. 그러나 `Vue.set(object, propertyName, value)` 메소드를 사용하여 중첩된 객체에 반응형 속성을 추가할 수 있습니다.

```
var vm = new Vue({
  data: {
    userProfile: {
      name: 'Anika'
    }
  }
})
```

다음과 같이 중첩된 `userProfile` 객체에 새로운 속성 `age`를 추가합니다.

```
Vue.set(vm.userProfile, 'age', 27)
```

인스턴스 메소드인 `vm.$set`를 사용할 수도 있습니다. 이는 전역 `Vue.set`의 별칭입니다.

```
vm.$set(vm.userProfile, 'age', 27)
```



때로는 `Object.assign()`이나 `_.extend()`를 사용해 기존의 객체에 새 속성을 할당할 수 있습니다. 이 경우 두 객체의 속성을 사용해 새 객체를 만들어야 합니다.

```
Object.assign(vm.userProfile, {
  age: 27,
  favoriteColor: 'Vue Green'
})
```

새로운 반응형 속성을 다음과 같이 추가합니다.

```
vm.userProfile = Object.assign({}, vm.userProfile, {
  age: 27,
  favoriteColor: 'Vue Green'
})
```
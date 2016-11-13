/**
 * Created by chepeiqing on 16/10/13.
 */
define(['app', 'service', 'sysCode'], function (app) {
    app.controller('modifyRedPackCtrl', function (service, $scope, $location, $state, $stateParams, $rootScope) {
        $scope.isAmountType = false;
        $scope.init = function () {
            $scope.redPack = service.getData();
            $scope.switchAmountType();
            console.log($scope.redPack);
            //查询复合人
            service.post2SRV("queryAuditPerson.do", null, function (data, status) {
                $scope.auditPerson = data;
            }, 4000);
        };

        $scope.switchAmountType = function () {
            if ($scope.redPack.amountType == '2') {
                $scope.isAmountType = true;
                var amountArr = $scope.redPack.totalAmount.split("-");
                $scope.redPack.totalAmount1 = amountArr[0];
                $scope.redPack.totalAmount2 = amountArr[1];
            } else {
                var amountArr = $scope.redPack.totalAmount.split("-");
                $scope.redPack.totalAmount1 = amountArr[0];
                $scope.isAmountType = false;
            }
        }

        $scope.doIt = function () {
            if ($scope.redPack.amountType == '1') {
                if ($scope.redPack.totalAmount1 == null || $scope.redPack.totalAmount1 == '') {
                    showError("错误提示：请输入红包金额");
                    return;
                }
                $scope.totalAmount = $scope.redPack.totalAmount1;
            } else {
                if ($scope.redPack.totalAmount1 == null || $scope.redPack.totalAmount1 == '' || $scope.redPack.totalAmount2 == null || $scope.redPack.totalAmount2 == '') {
                    showError("错误提示：请输入红包金额");
                    return;
                }
                $scope.totalAmount = $scope.redPack.totalAmount1 + '-' + $scope.redPack.totalAmount2;
            }
            if ($scope.redPack.wishing == null || $scope.redPack.wishing == '') {
                showError("错误提示：请填写红包祝福语");
                return;
            }
            if ($scope.redPack.actName == null || $scope.redPack.actName == '') {
                showError("错误提示：请填写活动名称");
                return;
            }
            if ($scope.redPack.remark == null || $scope.redPack.remark == '') {
                showError("错误提示：请填写备注");
                return;
            }
            if ($scope.person == null || $scope.person == '') {
                showError("错误提示：请选择复合人");
                return;
            }
            var formData = {
                "redPackSeq": $scope.redPack.redPackSeq,
                "redPackType": $scope.redPack.redPackType,
                "amountType": $scope.redPack.amountType,
                "totalAmount": $scope.totalAmount,
                "wishing": $scope.redPack.wishing,
                "actName": $scope.redPack.actName,
                "remark": $scope.redPack.remark,
                "state": $scope.redPack.state,
                "auditPersonSeq": $scope.person.userSeq,//复合人Seq
                "auditPerson": $scope.person.userName//复合人名称
            };
            service.post2SRV("modifyRedPack.do", formData, function (data, status) {
                $state.go("Main.RedPackManager");
            }, 4000);
        };
        $scope.init();
    });
});
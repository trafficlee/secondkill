/**
 * Created by traffic on 2018/07/10.
 */

$(function () {

	
	var dhcpOneConfig = {
			url: './ipPoolSetting/getOneListByGroupId',
			queryParams: queryParams1,
			selectItemName: false,
			columns: [{
				field: 'uid',
				title: '<input id="checkAll" type="checkbox" onclick="checkAll()">',
				align: 'center',
				valign: 'middle',
				formatter: function(val, row) {
					return '<input name="btSelectItem" type="checkbox" value=' + val + '>'
				},
				events: operateEvents_one
				},
				cell('nid', IpPoolSetting_TableTitle_01/* + '序号'*/, true),
				/*cell('uid', 'ID', true),*/
				cell('', IpPoolSetting_TableTitle_02/* + '操作'*/, undefined, oneOpFormatter, operateEvents_one),
				/*cell('gid','组ID'),*/
				cell('operatorname', IpPoolSetting_TableTitle_03/* + '操作员'*/, true),
				cell('name', IpPoolSetting_TableTitle_04/* + '组名'*/, true),
				cell('fldippoolname', IpPoolSetting_TableTitle_34/* + '地址池名称'*/, true),
				cell('startip', IpPoolSetting_TableTitle_05/* + '开始地址'*/, true),
				cell('endip', IpPoolSetting_TableTitle_06/* + '结束地址'*/, true),
				cell('mask', IpPoolSetting_TableTitle_07/* + '掩码'*/, true),
				cell('gateway', IpPoolSetting_TableTitle_08/* + '网关'*/, true),
				cell('firstdns', IpPoolSetting_TableTitle_09/* + '首选DNS'*/, true),
				cell('backdns', IpPoolSetting_TableTitle_10/* + '备选DNS'*/, true),
				cell('relayAddress', IpPoolSetting_TableTitle_11/* + '中继地址'*/, true),
				cell('additionalInformation', IpPoolSetting_TableTitle_12/* + '附加信息'*/, true),
				cell('flag', IpPoolSetting_TableTitle_13/* + '启用'*/, true, enableFormatter),
				cell('domain', IpPoolSetting_TableTitle_14/* + '域后缀'*/),
				cell('pxeservice', IpPoolSetting_TableTitle_15/* + 'PXE服务器'*/),
				cell('bootfilename', IpPoolSetting_TableTitle_16/* + '引导文件名'*/),
				cell('ntpservice', IpPoolSetting_TableTitle_17/* + 'NTP服务器'*/),
				cell('timezoneoffset', IpPoolSetting_TableTitle_18/* + '时区偏移'*/),
				cell('servicename', IpPoolSetting_TableTitle_19/* + '主机名'*/),
				cell('nisdomain', IpPoolSetting_TableTitle_20/* + 'NIS域名'*/),
				cell('nisservice', IpPoolSetting_TableTitle_21/* + 'NIS服务器'*/),
				cell('option43id', IpPoolSetting_TableTitle_22/* + 'OPTION43ID'*/),
				cell('optionselid', IpPoolSetting_TableTitle_23/* + 'OPTION自定义ID'*/),
				cell('networkmtu', IpPoolSetting_TableTitle_24/* + '网卡MTU'*/),
				cell('poolhiredtime', IpPoolSetting_TableTitle_25/* + '池租约时间(分钟)'*/),
				cell('keepstartip', IpPoolSetting_TableTitle_26/* + '保留开始地址'*/),
				cell('keependip', IpPoolSetting_TableTitle_27/* + '保留结束地址'*/),
				cell('switchip', IpPoolSetting_TableTitle_28/* + 'SNMP管理IP'*/),
				cell('snmpgroupname', IpPoolSetting_TableTitle_29/* + 'SNMP团体名'*/),
				cell('leasemaxvalue', IpPoolSetting_TableTitle_30/* + '自动保留租约最大比例(%)'*/),
				cell('remark', IpPoolSetting_TableTitle_31/* + '备注'*/)
			]
		};
	
	function cell(field,title,sort,formatter,events) {
        var st=false;
        if(sort!=undefined){
            st=sort;
        }
        return {field:field,title:title,align:'center',valign: 'middle',sortable: st,formatter: formatter,events:events};
    }

	var defaultConfig={
	        method:'get',
	        dataType: "json",
	        sidePagination: "server", //服务端请求
	        cache: false,
	        height: 500,
	        striped: true,
	        pagination: true,
	        pageSize: 20,
	        pageList: [20,50,100],
	        search: false,
	        showColumns: false,
	        showRefresh: false,
	        minimumCountColumns: 1,
	        clickToSelect: true,
	        queryParamsType: "limit"};
	
	
	initTree();
	function initTree(){
		$.ajax({
			type : "GET",
			url : "./ipPoolSetting/tree",
			success : function(data) {
				var obj = [];
				
				//把data封装成 Tree的格式对象
				$(data.devideList).each(function(){
			    	var o = {
			    		text:this.fldmaincontrolname,
			    		href:"#"+this.fldmaincontrolname,
			    		nodes:this.dhcpOneGroup,
			    	};
			    	obj.push(o);
			  	});
				
				//渲染Tree
			  	$('#treeview').treeview({
		            data: obj,
		            //选中时间
		            onNodeSelected: function(event, node) {
		            	debugger;
		            	if( node.uid != undefined && node.uid != "" ){
		            		dhcpOneConfig.url = "./ipPoolSetting/getOneListByGroupId?gid="+node.uid;
		            		var table1=$('#table_one').bootstrapTable('refresh',$.extend(defaultConfig,dhcpOneConfig));
		            	}
		            },
		        });
			}
		});
	}
	
	
});

function oneOpFormatter(val, row) {
	var ret = "<div style='text-align: center'>";
	ret += '<button class="btn btn-sm btn-default" style="padding: 2px 10px" id="btnEditOne" ><span class="glyphicon glyphicon-edit"></span></button>&nbsp;&nbsp;|&nbsp;&nbsp;';
	ret += '<button class="btn btn-sm btn-default" style="padding: 2px 10px" id="btnDelOne"><span class="glyphicon glyphicon-remove"></span></button>';
	return ret + "</div>";
}

function queryParams1(params) {
    var q=queryParams(params);
    var device=$('#deviceOne').val();
    var tmp=$.extend(q,{device:device});
    return tmp;
}

function queryParams(params) {  //配置参数
    var sort='uid';
    var order='asc';
    if(params.sort!=undefined){
        sort=params.sort;
        order=params.order;
    }
    var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
        limit: params.limit,   //页面大小
        offset: params.offset,  //页码
        sort: sort,  //排序列名
        order: order//排位命令（desc，asc）
    };
    return temp;
}

window.operateEvents_one = {
	'click #btnEditOne' : function(e, value, row, index) {
		var isHost = $("#isHost").val();
		if (isHost == "false") {
			layer.alert(IpPoolSetting_ErrorMessage_06/* + '备机不能修改数据！' */, {
				title : Tips,
				btn : Submit,
				icon : 2
			});
			return false;
		} else {
			// 修改
			var groupId = row.gid;
			var opt43 = row.option43id;
			var optSelf = row.optionselid;
			$.post('./ipPoolSetting/getDhcpOneGroupAll', {}, function(result) {
				$('#oneGroup').empty();
				var html = '';
				$.each(result, function(i, o) {
					if (o.uid == groupId) {
						html += '<option value="' + o.uid + '" selected>'
								+ o.name + '</option>';
					} else {
						html += '<option value="' + o.uid + '">' + o.name
								+ '</option>';
					}
				});
				$('#oneGroup').append(html);
			}, 'json');
			$.post('./ipPoolSetting/getOpt43', {}, function(result) {
				$('#option43').empty();
				var html = '<option value=""></option>';
				$.each(result, function(i, o) {
					if (o.uid == opt43) {
						html += '<option value="' + o.uid + '" selected>'
								+ o.remark + '</option>';
					} else {
						html += '<option value="' + o.uid + '">' + o.remark
								+ '</option>';
					}
				});
				$('#option43').append(html);
			}, 'json');
			$.post('./ipPoolSetting/getOptSelf', {}, function(result) {
				$('#optionSelf').empty();
				var html = '<option value=""></option>';
				$.each(result, function(i, o) {
					if (o.uid == optSelf) {
						html += '<option value="' + o.uid + '" selected>'
								+ o.name + '</option>';
					} else {
						html += '<option value="' + o.uid + '">' + o.name
								+ '</option>';
					}
				});
				$('#optionSelf').append(html);
			}, 'json');

			initEditWin('one');
			fillForm(row);
			$("#edit_win_title")
					.html(IpPoolSetting_Nav_01 + "[" + Edit + "]"/*
																	 * +
																	 * "IPv4地址池[修改]"
																	 */);
			$("#edit_win").modal('show');
		}
	},
	'click #btnDelOne' : function(e, value, row, index) {
		var isHost = $("#isHost").val();
		if (isHost == "false") {
			layer.alert(IpPoolSetting_ErrorMessage_05/* + '备机不能删除数据！' */, {
				title : Tips,
				btn : Submit,
				icon : 2
			});
			return false;
		} else {
			// 删除
			var uid = row.uid;
			var ipStart = row.startip;
			var ipEnd = row.endip;
			$('input[name="del_uid"]').val(uid);
			$('input[name="del_opType"]').val("one");
			$("[name='tip_modal_msg']").html(
					IpPoolSetting_ModalTips_06.format(ipStart + ' - ' + ipEnd)
			/* "你确定删除地址池为【"+ipStart+'-'+ipEnd+"】的设置？" */
			);
			$("#tip_modal").modal('show');
		}
	},
	'click input[name="btSelectItem"]' : function(e, value, row, index) {
		// 判断是否全部选中
		var checkCount = 0;
		var count = $('input[name="btSelectItem"]').length;
		$('input[name="btSelectItem"]').each(function() {
			if ($(this).is(':checked')) {
				checkCount++;
			}
		})
		if (checkCount == count) {
			$("#checkAll").prop("checked", true);
		} else {
			$("#checkAll").prop("checked", false);
		}
		// 判断有无选取
		if (checkCount == 0) {
			$("#batchEdt, #batchDel").attr("disabled", "disabled");
		} else {
			$("#batchEdt, #batchDel").removeAttr("disabled");
		}
	}
};

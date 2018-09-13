<?xml version="1.0" encoding="UTF-8"?>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<body>
	<div class="easyui-panel" style="width:100%;height:200px;padding:10px;border: 0px;">
		<div class="easyui-layout" data-options="fit:true">
			<div data-options="region:'west'" style="width:50%;padding:10px;border: 0px;">
				<div id="p1" class="easyui-panel" title="系统信息" style="width:100%;height:150px;padding:10px;">
					<ul>
						<li>java版本:${systemInfo.javaVersion }</li>
						<li>操作系统:${systemInfo.os }</li>
						<li>使用内存/总内存:${systemInfo.totalRam }M/${systemInfo.usedRam }M</li>
					</ul>
				</div>
			</div>
			<div data-options="region:'east'" style="width:50%;padding:10px;border: 0px;">
				<div id="p2" class="easyui-panel" title="系统信息" style="width:100%;height:150px;padding:10px;">
					<ul>
						<li>java版本:${systemInfo.javaVersion }</li>
						<li>操作系统:${systemInfo.os }</li>
						<li>使用内存/总内存:${systemInfo.totalRam }M/${systemInfo.usedRam }M</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
	<div class="easyui-panel" style="width:100%;height:200px;padding:10px;border: 0px;">
		<div class="easyui-layout" data-options="fit:true">
			<div data-options="region:'west'" style="width:50%;padding:10px;border: 0px;">
				<div id="p1" class="easyui-panel" title="系统信息" style="width:100%;height:150px;padding:10px;">
					<ul>
						<li>java版本:${systemInfo.javaVersion }</li>
						<li>操作系统:${systemInfo.os }</li>
						<li>使用内存/总内存:${systemInfo.totalRam }M/${systemInfo.usedRam }M</li>
					</ul>
				</div>
			</div>
			<div data-options="region:'east'" style="width:50%;padding:10px;border: 0px;">
				<div id="p2" class="easyui-panel" title="系统信息" style="width:100%;height:150px;padding:10px;">
					<ul>
						<li>java版本:${systemInfo.javaVersion }</li>
						<li>操作系统:${systemInfo.os }</li>
						<li>使用内存/总内存:${systemInfo.totalRam }M/${systemInfo.usedRam }M</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</body>
</html>